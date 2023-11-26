import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PlatformLocation} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {

  public user;

  constructor(
    private http: HttpClient,
    private platformLocation: PlatformLocation,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get('http://' + this.platformLocation.hostname + '/user', {headers: headers}).subscribe(
      result => {
        this.user = result;
        console.log(result)
        console.log(headers)
      },
      err => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    )
  }

}
