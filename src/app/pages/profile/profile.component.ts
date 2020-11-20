import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../providers/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../providers/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  public profileForm: FormGroup;
  public usuario:Usuario;
  public imagenUpload:File;
  public imagenTemp:any = null;


  constructor( private fb:FormBuilder, 
    private usuarioService:UsuarioService,
    private fileUploadService:FileUploadService) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre,Validators.required],
      email: [this.usuario.email,[Validators.required, Validators.email]],
    });
  }

  actualizarDatos(){
    this.usuarioService.actualizarUsuario(this.profileForm.value)
      .subscribe( (resp:any) => {
        
        // De este modo actualizo los nombres en todos los lugares de la app ya que como estoy usando el usuario por referencia este se modifica en todos lo lugares donde lo uso.
        const {nombre, email}= resp.usuario;
        this.usuario.nombre=nombre;
        this.usuario.email=email;

        Swal.fire('Guardado', 'Cambios realizados con exito', 'success');
        
      }, (err) => {
        console.log(err);
        
        Swal.fire('Error', err.error.msg , 'error');
      })
  }

  cambiarImagen(file:File){

    this.imagenUpload=file; 

    if (!file) {
      return this.imagenTemp= null;
    } 

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenTemp= reader.result;
    }
    

  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenUpload,'usuarios',this.usuario.uid).then( img => {
      this.usuario.img=img;
      Swal.fire('Guardado', 'Cambios realizados con exito', 'success');
    }).catch(err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
  }






}
