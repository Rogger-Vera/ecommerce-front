import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ){ }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })
  }

  register(){
    
    if (this.registerForm.valid) {
      this.isLoading = true;
      const name = this.registerForm.value.name;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      const confirmPassword = this.registerForm.value.confirmPassword;

      if (password !== confirmPassword) {
        return alert("Las contraseñas no coinciden");
      }
      this.authService.register(this.registerForm.value).subscribe(
        (res) => {
          setTimeout(() => {
            this.toastr.success('Usuario registrado con exito', 'Registro exitoso');
            this.router.navigateByUrl("/login");
            this.isLoading = false;
          }, 2000)
        },
        (error) => {
          setTimeout(() => {
            this.toastr.error('Ocurrió un error, vuelva a intentar!');
            this.isLoading = false;
          }, 2000)
        }
      )
    } else{
      this.registerForm.markAllAsTouched();
    }
    
  }

}
