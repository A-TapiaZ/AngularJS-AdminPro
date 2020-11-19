import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../providers/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }
  
  logout(){
    this.usuarioService.logout();
  }

}
