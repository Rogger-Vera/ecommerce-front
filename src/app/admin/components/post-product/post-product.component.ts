import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.css']
})
export class PostProductComponent implements OnInit  {

  productForm!: FormGroup;
  listOfCategories: any = [];
  selectedFiles: File[] | null;
  imagePreviews: string[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      images: ['', Validators.required],
    })
    this.getAllCategories();
  }

  
  onFileSelected(event: any){
    this.selectedFiles = Array.from(event.target.files);
    this.previewImage();
  }
  
  previewImage(){
    if (this.selectedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews = [e.target.result];
      };
      reader.readAsDataURL(this.selectedFiles[0]);
    }
  }
  
  getAllCategories(){
    this.adminService.getAllCategories().subscribe( res => {
      this.listOfCategories = res;
    })
  }

  addProduct(){
    if (this.productForm.valid) {
      this.isLoading = true;
      const formData: FormData = new FormData();
      this.selectedFiles.forEach((file, index) => {
        formData.append(`imgFiles[${index}]`, file);
      });

      formData.append('categoryId', this.productForm.value.categoryId);
      formData.append('name', this.productForm.value.name);
      formData.append('description', this.productForm.value.description);
      formData.append('price', this.productForm.value.price);

      this.adminService.addProduct(formData).subscribe( 
        (res) => {
          if (res.id != null) {
            setTimeout( () => {
              this.toastr.success(`El producto ${this.productForm.value.name} se agrego correctamente`, 'Producto agregado');
              this.router.navigateByUrl('/admin/dashboard');
              this.isLoading = false;
            }, 2000);
          } else{
            alert(res.message);
            setTimeout( () => {
              this.toastr.warning(`No se pudo agregar la categoria ${this.productForm.value.name}`, 'Ocurrio un error');
              this.isLoading = false;
            }, 2000);
          }
        }, (error) => {
          console.log('errorMessage: ', error.message);
          setTimeout( () => {
            this.toastr.error(`No se pudo agregar la categoria ${this.productForm.value.name}`, 'Ocurrio un error');
            this.isLoading = false;
          }, 2000);
      })

    }
    else{
      this.productForm.markAllAsTouched();
    }
  }
}
