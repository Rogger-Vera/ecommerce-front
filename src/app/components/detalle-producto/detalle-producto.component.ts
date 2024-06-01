import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/customer/services/customer.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit{

  products: any[] = [];
  product: any;
  id: number | undefined;
  showDescription = false;

  galeryImages:[] = [];
  currentImg: string | undefined;
  renderGalery: Boolean = true;

  constructor(private aRouter: ActivatedRoute,
    private customerService: CustomerService
  ){

  }

  ngOnInit(): void {
    this.id = Number(this.aRouter.snapshot.params['id']);
    console.log(this.id);
    this.getAllProducts();
  }

  getAllProducts(){
    this.customerService.getAllProducts().subscribe( 
      res => {
        res.forEach(product => {
          // Procesar cada imagen y agregarla a una lista de imágenes procesadas
          product.processedImages = product.images.map(image => 'data:image/jpeg;base64, ' + image);
        });
        this.product = res.filter( product => product.id === this.id)[0];
        this.galeryImages = this.product.processedImages
        this.currentImg = this.product.processedImages[0];
        console.log("product: ", this.product)
        console.log("galery: ", this.product.processedImages)
      },
      err => {
        console.error('Error fetching products', err);
      }
    );
  }

  addToCart(productId: any){
    
  }

  closeDescription() {
    this.showDescription = !this.showDescription;
  }

  handleCahngeImage(image: string){
    this.currentImg = image;
  }

}
