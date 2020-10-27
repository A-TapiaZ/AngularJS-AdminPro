import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../providers/settings.service';

// Esta declaracion es para que typescript no tire error por una funcion que el no alcanza a supervisar
declare function customInitFunctions();

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
})
export class MainDashboardComponent implements OnInit {


  constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {
    // Esta funcion es para inicializar los scripts del index.html
    // Esta funcion viene de /assets/js/custom.js
    customInitFunctions();
  }

}
