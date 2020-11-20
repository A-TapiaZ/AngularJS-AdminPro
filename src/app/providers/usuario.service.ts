import { Injectable, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { RegisterForm } from '../interfaces/registerForm.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/loginForm.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const {base_url}= environment;

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  auth2:any;
  usuario:Usuario;

  constructor(private http: HttpClient,private router:Router, private ngZone:NgZone) {
    this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid || '';
  }


  googleInit(){

    return new Promise (resolve => {
      
      gapi.load('auth2',() => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '37233226989-ds0qv4d2snem0a7r994jl5np61fidam5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
       resolve(); 
      });
    })

  }

  logout(){
    localStorage.removeItem('token');
    
    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
  
  validarToken(): Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`,{
      headers: {
        'x-token':this.token
      }
    }).pipe(
        map((resp:any) => {

          const {email,google,nombre,role,uid,img=''}= resp.usuario;

          // Ojo esto seria una instancia de la clase por lo que usuario tendria los metodos de la clase Usuario. Sin embargo si lo hubieramos hecho 'this.usuario= resp.usuario' usuario NO tendria los metodos de la clase usuario.
          this.usuario= new Usuario (nombre,email,'',role,google,img,uid);
          
          localStorage.setItem('token',resp.token)

          return true
        }),
        catchError(error => { 
          console.log(error);
          return of(false)
        })
      )
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  // TODO: capitulo 15.8 en el backend del profesor era obligatorio enviar el rol del usuario que iba a actualizar, en mi back yo no lo puse obligatorio
  actualizarUsuario(data:{email:string,nombre:string}){

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data,
    {
      headers: {
        'x-token':this.token
      }
    });

  }

  loginUsuario(formData: LoginForm){

    if (formData.rememberMe) {
      localStorage.setItem('email', formData.email);
    }else{
      localStorage.removeItem('email');
    }

    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      map((resp:any) => {

        localStorage.setItem('id',resp.id);
        localStorage.setItem('token',resp.token);
        localStorage.setItem('usuario',JSON.stringify(resp.usuario));

        return true;
      })
    )
  }

  loginGoogle(token){

    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap( (resp:any) => {
          localStorage.setItem('token', resp.token)
        })
      )

  }


}


