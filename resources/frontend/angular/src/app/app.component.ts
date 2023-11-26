import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loggedIn = false;

  ngOnInit(){
    this.loggedIn = localStorage.getItem('token') !== null;
    console.log(localStorage.getItem('token'))
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
