import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
//import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.bookForm = this.formBuilder.group({
      pais: [''],
      url_recetario: ['']
    })
   }

  ngOnInit(): void {
  }

  onSubmit(): any{
    this.crudService.AddBook(this.bookForm.value)
    .subscribe(() => {
      console.log('Se han enviado los datos correctamente')
      this.ngZone.run(() => this.router.navigateByUrl('/book-list'))
    }, (err) => {
      console.log(err);
    });
  }

}
