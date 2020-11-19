import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../providers/sidebar.service';
import { UsuarioService } from '../../providers/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems:any[]=[];

  constructor(private sidebarService:SidebarService, private usuarioService:UsuarioService) {
    this.menuItems= this.sidebarService.menu;
   }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }

}
