import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../providers/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formSubmitted = false;

  registerForm= this.fb.group({
    nombre: ['Fernando', [Validators.required, Validators.minLength(3)],],
    email: ['test100@gmail.com', [Validators.required,Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(3)],],
    password2: ['1234567', [Validators.required, Validators.minLength(3)],],
    terminos: [false, [Validators.requiredTrue],],
  },
  {validators: this.passwordsIguales('password','password2')
  })

  constructor(private fb: FormBuilder,
    private usuarioService:UsuarioService,
    private router:Router) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    this.formSubmitted=true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return ;
    }

    // Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe((resp) => {
        console.log('Usuario creado');
        console.log(resp);
        this.router.navigateByUrl('/')
      }, (err)=> {
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
  }

  campoNoValido(campo:string):boolean{
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    
    if ((pass1!==pass2) && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }

  // Validador personalizado, debe retornar un objeto o retornar null
  // Debo retornar una funcion.
  passwordsIguales(pass1Name:string, pass2Name:string){

    return (formGroup:FormGroup) => {
      
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
    
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noIgual:true});
      }
    } 
  }


}
