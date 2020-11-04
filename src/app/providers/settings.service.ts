import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public linkTheme= document.getElementById('theme');

  constructor() { 
    let theme=localStorage.getItem('themeUrl') || './assets/css/colors/red-dark.css' ;
    this.linkTheme.setAttribute('href',theme);
  }


  changeTheme(theme:string){

    const url= `./assets/css/colors/${theme}.css`
    
    this.linkTheme.setAttribute('href',url);
    localStorage.setItem('themeUrl', url);
    this.checkCurrentTheme();
  }

  
  checkCurrentTheme(){

    const linkCheck:NodeListOf<Element> = document.querySelectorAll('.selector');

    linkCheck.forEach(elem => {

      elem.classList.remove('working');
      const btnTheme= elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const currentTheme = this.linkTheme.getAttribute('href')

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    });
  }
}
