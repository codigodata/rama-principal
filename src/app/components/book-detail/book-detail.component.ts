import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service'
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) { 
    this.getId = this.activatedRoute.snapshot.params.get('id');
    this.crudService.getBook(this.getId).subscribe(res => {
      this.updateForm.setValue({
        pais: res['pais'],
        recetario: res['recetario']
      })
    });
    this.updateForm = this.formBuilder.group({
      pais: [''],
      recetario: ['']
    })
  }

  ngOnInit(): void {
  }

  onUpdate(): any{
    this.crudService.updateBook(this.getId, this.updateForm.value)
    .subscribe(() => {
      console.log("Datos modificados con éxito")
      this.ngZone.run(() => this.router.navigateByUrl('/book-list'))
    }, (err) => {
      console.log(err);
    });
  }

}
