import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
  }

  login(): void{
    if (this.loginForm.valid) {
      this.isLoading = true;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.login(email, password).subscribe(
        (res) => {
          setTimeout(() => {
            if (UserStorageService.isAdminLoggedIn()) {
              this.router.navigateByUrl("admin/dashboard");
            }else if (UserStorageService.isCustomerLoggedIn()) {
              this.router.navigateByUrl("customer/dashboard");
            }
            this.toastr.success('Usuario ingresado con exito', 'Credenciales correctas');
            this.isLoading = false;
          }, 2000)  
        },
        (error: HttpErrorResponse) => {
          setTimeout(() => {
            if (error.status === 401) {
              this.toastr.warning("Email o contraseña incorrecto")
            } else {
              console.log("error: ", error);
              this.toastr.error('Ocurrió un error, vuelva a intentar!');
            }
            this.isLoading = false;
          }, 2000)
        }
      )
      
    } else{
      this.loginForm.markAllAsTouched();
    }
  }

  // showToast(type: 'success' | 'warning', message?: string): void {
  //   const toast = document.getElementById(`toast-${type}`);
  //   if (toast) {
  //     toast.querySelector('.text-sm.font-normal')!.textContent = message || (type === 'success' ? 'Acceso exitoso.' : 'Error en el acceso.');
  //     toast.classList.remove('hidden');
  //     setTimeout(() => {
  //       toast.classList.add('hidden');
  //     }, 2000);
  //   }
  // }

}
