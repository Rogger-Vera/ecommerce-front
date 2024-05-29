import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent implements OnInit {

  categoryForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]]
    })
  }

  addCategory(){
    if (this.categoryForm.valid) {
      this.isLoading = true;
      this.adminService.addCategory(this.categoryForm.value).subscribe(
        (res) => {
          if (res.id != null) {
            setTimeout( () => {
              this.toastr.success(`Categoria ${this.categoryForm.value.name} agregada correctamente`, 'Categoria Agregada');
              // this.categoryForm.reset();
              this.router.navigateByUrl('/admin/dashboard')
              this.isLoading = false;
            }, 2000);
          } else{
            setTimeout( () => {
              this.toastr.warning(`No se pudo agregar la categoria ${this.categoryForm.value.name}`, 'Ocurrio un error');
              this.router.navigateByUrl('/admin/dashboard')
              this.isLoading = false;
            }, 2000);
          }
        }, (error) => {
          console.log('errorMessage: ', error.message);
          setTimeout( () => {
            this.toastr.error(`No se pudo agregar la categoria ${this.categoryForm.value.name}`, 'Ocurrio un error');
            this.isLoading = false;
          }, 2000);
      })
    } else{
      this.categoryForm.markAllAsTouched();
    }
  }

}
