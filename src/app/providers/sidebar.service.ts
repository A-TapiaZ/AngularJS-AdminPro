import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[]=[
    {
      title:'Dashboard',
      url:'/',
      icon: 'mdi mdi-gauge',
      submenu:[
        {title:'Charts',url:'graphic1'},
        {title:'Main',url:'/'},
        {title:'ProgressBar',url:'progress'},
        {title:'Promises',url:'promises'},
      ]
    }
  ]

  constructor() { }

}
