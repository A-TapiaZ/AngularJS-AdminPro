import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {filter, map} from 'rxjs/operators'


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  title:string ='';
  // El simbolo $ se lo ponemos para especificar que es un observable.
  tituloSubs$: Subscription;

  constructor(private router:Router) {
    this.tituloSubs$=this.getArgumentosRuta()
      .subscribe(({title}) => {
        this.title=title;
        document.title=`AdminPro-${title}`;
      }) 
   }

  ngOnInit(): void {
  }

  getArgumentosRuta(){

    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event:ActivationEnd) => event.snapshot.firstChild===null),
      map( (event:ActivationEnd) => event.snapshot.data))
      // 
  }

  ngOnDestroy(): void {
    // Esto lo hicimios porque al momento de darle logout, ya no es necesario saber la informacion que contiene la ruta. Y si volvemos a entrar sin refrescar el navegador, se va a disparar otra subscripcion, por lo que cada vez que ingreseramos acumulariamos otro subscribe
    this.tituloSubs$.unsubscribe();
  }
}
