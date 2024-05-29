import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import  {  BrowserAnimationsModule  }  from  '@angular/platform-browser/animations' ;

// Modules
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  {  ToastrModule  }  from  'ngx-toastr' ;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ListaProductosComponent,
    ProductoComponent,
    DetalleProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule ,  // módulo de animaciones requerido 
    ToastrModule . forRoot ({
        timeOut: 3500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        // tapToDismiss: true
    } ) ,  // ToastrModule agregado 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
