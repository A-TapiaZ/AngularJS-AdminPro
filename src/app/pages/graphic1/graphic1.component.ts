import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-graphic1',
  templateUrl: './graphic1.component.html',
  styleUrls: ['./graphic1.component.css']
})
export class Graphic1Component implements OnInit {

 
  labels1:string[] = ['TITULO 1', 'In-Store Sales', 'Mail-Order Sales'];

  data1 = [
    [10, 20, 30],
  ];


  constructor() { }

  ngOnInit(): void {
  }



}
