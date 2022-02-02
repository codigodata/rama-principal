import { Injectable } from '@angular/core';
import { Book } from './book';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CrudService {

  // conexion de ruta a Express server API
  REST_API: String = "http://localhost:8000/api";

  //http Header API
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  //Add
  AddBook(data: Book): Observable<any>{
    let API_URL = `$(this.REST_API)/add-book`;
    return this.httpClient.post(API_URL, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  // Get all object
  GetBooks(){
    return this.httpClient.get(`${this.REST_API}`);
  }

  //Get single object
  GetBook(id: any): Observable<any>{
    let API_URL = `${this.REST_API}/read-book${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
    .pipe(map((res: any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  //Update
  deleteBook(id: any): Observable<any>{
    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

  //Error
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }else{
      //Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
      return throwError(errorMessage);
  }
}
