import { AfterViewInit, Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  products: any[] = [];
  searchProductForm!: FormGroup;
  isLoading = false;
  productToDelete: any;
  showModal = false;

  constructor(private adminService: AdminService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ){
    // Escuchar eventos de navegación para cerrar el modal al cambiar de ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeModal();
      }
    });
  }

  ngAfterViewInit(): void {
    this.productToDelete = null;
  }

  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, Validators.required]
    })
  }

  getAllProducts(){
    this.adminService.getAllProducts().subscribe( 
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
    this.adminService.getAllProductsByName(title).subscribe( 
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

  deleteProduct(productId: any){
    this.isLoading = true;
    this.adminService.deleteProduct(productId).subscribe(
      (res) => {
        console.log('res: ', res)
        if (res.status == 200) {
          setTimeout( () => {
            this.toastr.success('El producto se elimino correctamente', 'Producto eliminado');
            this.isLoading = false;
          }, 2000);
          this.getAllProducts();
        }else{
          setTimeout( () => {
            this.toastr.warning('No se pudo eliminar el producto', 'Ocurrio un error');
            this.isLoading = false;
            console.log('errorWarning: ', res.message);
          }, 2000);
        }
      }, (error) =>{
        setTimeout( () => {
          this.toastr.error('No se pudo eliminar el producto', 'Ocurrio un error');
          this.isLoading = false;
          console.log('error: ', error.message);
        }, 2000)
      }
    )
    setTimeout( () => {this.closeModal();}, 2000)
  }

  setProductToDelete(product: any) {
    this.productToDelete = product;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.productToDelete = null;
  }

}
