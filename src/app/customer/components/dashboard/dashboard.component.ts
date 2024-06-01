import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router){}

    ngOnInit(){
      this.getAllProducts();
      this.searchProductForm = this.fb.group({
        title: [null, Validators.required]
      })
    }
  
    getAllProducts(){
      this.customerService.getAllProducts().subscribe( 
        res => {
          res.forEach(product  => {
            // Procesar cada imagen y agregarla a una lista de imágenes procesadas
            product.processedImages = product.images.map(image => 'data:image/jpeg;base64, ' + image);
          });
          this.products = res;
        },
        err => {
          console.error('Error fetching products', err);
        }
      );
    }
  
    submitForm(){
      const title = this.searchProductForm.value.title.toLowerCase();
      this.customerService.getAllProductsByName(title).subscribe( 
        res => {
          res.forEach(product  => {
            // Procesar cada imagen y agregarla a una lista de imágenes procesadas
            product.processedImages = product.images.map(image => 'data:image/jpeg;base64, ' + image);
          });
          this.products = res;
        },
        err => {
          console.error('Error fetching products', err);
        }
      );
    }
  
}
