import { Injectable, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { RegisterForm } from '../interfaces/registerForm.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/loginForm.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const {base_url}= environment;

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  auth2:any;

  constructor(private http: HttpClient,private router:Router, private ngZone:NgZone) {
    this.googleInit();
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
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`,{
      headers: {
        'x-token':token
      }
    }).pipe(
        tap((resp:any) => {
          localStorage.setItem('token',resp.token)
        }),
        map((resp) => true),
        catchError(error => of(false))
      )
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData);
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


