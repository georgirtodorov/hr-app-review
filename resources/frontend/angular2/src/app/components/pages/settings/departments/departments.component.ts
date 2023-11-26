import {Component, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {DepartmentsService} from '../../../../services/pages/settings/departments.service';
import {trigger, style, animate, transition} from '@angular/animations';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatAccordion} from '@angular/material/expansion';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

export interface Department {
    id?: number;
    name: string;
}

@Component({
    selector: 'departments',
    templateUrl: './departments.component.html',
    styleUrls: ['../settings.component.scss', './departments.component.scss'],
    animations: [
        trigger(
            'enterFromBottom', [
                transition(':enter', [
                    style({transform: 'translateY(100%)', opacity: 0}),
                    animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
                ]),
                transition(':leave', [
                    style({transform: 'translateY(0)', opacity: 1}),
                    animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
                ])
            ]
        )
    ]
})
export class DepartmentsComponent implements OnInit {
    @ViewChild(MatAccordion) accordion: MatAccordion;

    public loading = true;
    public addOnBlur = true;
    public departments: Department[];
    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    constructor(
        private departments_service: DepartmentsService,
    ) {
    }

    ngOnInit(): void {
        this.get();
    }

    private get(): void {
        this.departments_service.get().subscribe(result => {
            this.departments = result;
            this.loading = false
        })
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            this.departments.push({name: value});
            this.departments_service.add({name: value}).subscribe(result => {
                if (result) {
                    this.get()
                }
            })
        }

        // Clear the input value
        event.chipInput!.clear();

    }

    remove(department: Department): void {
        const index = this.departments.indexOf(department);

        if (index >= 0) {
            this.departments.splice(index, 1);
        }
        this.departments_service.delete(department.id).subscribe(result => {
            if (result) {
                this.get()
            }
        })
    }
}
