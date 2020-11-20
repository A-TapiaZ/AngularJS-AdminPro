import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../providers/sidebar.service';
import { UsuarioService } from '../../providers/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menuItems:any[]=[];
  public usuario:Usuario;


  constructor(private sidebarService:SidebarService, private usuarioService:UsuarioService) {
    this.menuItems= this.sidebarService.menu;
    this.usuario= usuarioService.usuario;
   }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }

}
