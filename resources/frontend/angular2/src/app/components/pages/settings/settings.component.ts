import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {UsersService} from '../../../services/helpers/users/users.service'

import {MatExpansionModule} from '@angular/material/expansion';
import {MatAccordion} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    @ViewChild(MatAccordion) accordion: MatAccordion;

    form: UntypedFormGroup

    constructor(
        private fb: UntypedFormBuilder,
        private users_service: UsersService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            password_confirmation: ['', Validators.required]
        })


    }

    public register() {
        const formData = this.form.getRawValue();

        this.users_service.register(formData).subscribe(
            result => {
                console.log(result);
            }, error => {
                console.log(error);
            }
        )
    }
}
