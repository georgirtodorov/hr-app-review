import { Injectable } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class EmployeeFormService {
    EmployeeForm = this.fb.group({
        department_id: ['', Validators.required],
        position_id: ['', Validators.required],
        location_id: ['', Validators.required],
        supervisors: [[], null],
        first_name: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]{0,14}$')]],
        last_name: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]{0,14}$')]],
        surname: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]{0,14}$')]],
        email: ['', [Validators.required, Validators.email]],
        city: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]{0,14}$')]],
        post_code: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
        address: ['', Validators.required, Validators.maxLength(50)],
        country: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]{0,14}$')]],
        pin: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        personal_phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        start: ['', Validators.required],
        work_phone: ['', Validators.pattern('^[0-9]{10}$')],
    });
    constructor(private fb: UntypedFormBuilder) { }
}
