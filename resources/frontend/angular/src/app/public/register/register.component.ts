import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private platformLocation: PlatformLocation,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    })
  }

  public register(){
    const formData = this.form.getRawValue();

    this.http.post('http://' + this.platformLocation.hostname + '/register',formData).subscribe(
      result => {
        console.log(result);
      }, error => {
        console.log(error);
      }
    )
  }


}
