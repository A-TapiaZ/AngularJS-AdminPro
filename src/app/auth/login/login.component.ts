import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../providers/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email:string;
  auth2:any;

  loginForm = this.fb.group({
    email:['',Validators.required,],
    password:['',Validators.required,],
    rememberMe:[false],
  })


  constructor(private router:Router, 
    private fb: FormBuilder, 
    private usuarioService:UsuarioService, 
    private ngZone:NgZone) { }

  ngOnInit(): void {
    
    // FORMA ELEGANTE DE RECORDAR EL CORREO DE UN LOGIN
    this.email=localStorage.getItem('email') || '';
    console.log(this.email);

    this.loginForm.get('email').setValue(this.email);
    
    if (this.email.length>1) {
      this.loginForm.get('rememberMe').setValue(true);
    };


    // Renderizamos el boton de google
    this.renderButton();
  }

  login(){

    console.log(this.loginForm.value);
    

    if (this.loginForm.invalid) {

      Swal.fire({
        title: 'Error!',
        text: 'Complete los campos',
        icon: 'error',
      })
      return;
    }

    this.usuarioService.loginUsuario(this.loginForm.value)
      .subscribe((resp) => {
        console.log(resp); 

        this.router.navigateByUrl('/')

      },(err) => {

        console.log(err);
        
        Swal.fire({
          title: 'Error!',
          text: err.error.msg || err.error.errors.email.msg,
          icon: 'error',
        })
      })

  }


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }


  async startApp() {
    
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
      
    this.attachSignin(document.getElementById('my-signin2'));
    
  };


  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          var id_token = googleUser.getAuthResponse().id_token;
          
          this.usuarioService.loginGoogle(id_token)
            .subscribe((resp) => {
             
            // Despues de identificarnos con exito redireccionamos al dashboard
            // El ngzone se usa cuando librerias ajenas a angular se encargan de realizar una redireccion. O sea el metodo de redireccionamiento es de angular, pero quien lo dispara es un metodo de google.

            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            });
              
            });

        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  } 


}
