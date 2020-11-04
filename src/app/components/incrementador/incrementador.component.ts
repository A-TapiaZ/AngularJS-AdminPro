import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  // @Input('alias de la vble') progreso:number=10; 
  @Input() progreso:number=10;
  @Input() btnClass:string='btn btn-primary';
  
  @Output() valorSalida:EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  changePercent(valor:number){

    if (this.progreso >=100 && valor>=0) {
      this.valorSalida.emit(100);
      return this.progreso=100;
    }
    if (this.progreso<=0 && valor < 0){
      this.valorSalida.emit(0);
      return this.progreso=0;
    }
    this.progreso= this.progreso+valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange(evento:number){

    console.log(evento);
    

    if (evento >= 100) {
      this.progreso=100;
    }
    else if (evento<= 0){
      this.progreso=0;
    }
    else {
      this.progreso=evento;
    }
    
    this.valorSalida.emit(this.progreso);
  }

}
