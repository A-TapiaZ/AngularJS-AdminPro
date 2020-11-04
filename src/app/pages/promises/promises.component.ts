import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnDestroy {

  intervalSubs: Subscription;

  constructor() { 

    this.intervalSubs=this.retornarIntervalo().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornarIntervalo(): Observable<number> {
    
    return interval(100).pipe(
      take(10),
      map(valor => valor +1),
      filter(valor => (valor % 2 === 0) ? true : false),
    );
  }


  retornaObservable():Observable<number>{
    let i =-1;

    return new Observable<number>(observer => {
      
      const intervalo = setInterval( () => {
        
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error(`i llego al valor de 2`)
        }

      }, 1000) 
    })
  }
}
