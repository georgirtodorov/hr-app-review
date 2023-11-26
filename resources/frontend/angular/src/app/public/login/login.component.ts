import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private platformLocation: PlatformLocation,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: ''
      }
    )
  }

  login(){
    console.log(this.form.getRawValue());
    const formData = this.form.getRawValue();

    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: 'password', // password , client_credentials
      client_id: '2',
      client_secret: 'eZYTB9xw5wOXs29KlWubDpJaLgrd8tAw1AKM1Us8',
      scope: '*'
    };
    this.http.post('http://' + this.platformLocation.hostname + '/oauth/token', data).subscribe(
      (result: any) =>{
        console.log('success');
        console.log(result);
        localStorage.setItem('token', result.access_token);
        console.log(localStorage);
        this.router.navigate(['/secure']);
      },
      error => {
        console.log('error');
        console.log(error);
      }
    );
  }
}
