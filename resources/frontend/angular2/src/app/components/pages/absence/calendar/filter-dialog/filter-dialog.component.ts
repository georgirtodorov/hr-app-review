import {Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CalendarFilter} from "../../../../../classes/pages/absence/calendar/filter";

//someautocompete with chips
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
    AbsenceRequestApprovalStatus
} from "../../../../../classes/pages/profile/absence/request/absence-request.interface";
@Component({
    selector: 'app-filter-dialog',
    templateUrl: './filter-dialog.component.html',
    styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {
    location_cities = []; // Add the list of available locations
    employees = []
    selectedLocations = [];
    department_names = [];
    position_names = []

   filter: CalendarFilter = new CalendarFilter();
    public absence_status_List = Object.values(AbsenceRequestApprovalStatus);
    public absence_types = [];

    constructor(
        public dialogRef: MatDialogRef<FilterDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.filteredEmployees = data.employees;
        this.employees = data.employees;
        this.filter.filters = data.filters
        this.location_cities = data.location_cities
        this.department_names = data.department_names
        this.position_names = data.position_names
        this.absence_types = data.absence_types
    }

    ngOnInit(): void {
    }



    apply() {
        this.dialogRef.close({
            event: 'apply',
            data: this.filter
        });
    }

    clearFilters() {
        this.selectedLocations = [];
        // Reset other filter properties here
    }


    // some test for autocompete with chips
    @ViewChild('employeeAutocomplete') employeeAutocomplete: MatAutocomplete;
    employeeControl = new FormControl();
    filteredEmployees: any[] = []; //Employee[] You should initialize this array with all available employees.
    selectedEmployees: any[] = []; //Employee[]


    onEmployeeInputChange(event: Event) {
        const input = (event.target as HTMLInputElement).value;
        // Filter the employees based on the input value
        this.filteredEmployees = this.employees.filter(employee => {
            const name = `${employee.first_name} ${employee.last_name}`;
            return name.toLowerCase().includes(input.toLowerCase());
        });
    }

    onEmployeeChipEnd(event: MatChipInputEvent): void {
        if (!this.employeeAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

            // Add employee
            if ((value || '').trim()) {
                // You should add a new employee to the selectedEmployees array based on the value
            }

            // Reset the input value
            if (input) {
                input.value = '';
            }

            this.employeeControl.setValue(null);
        }
    }

    onEmployeeOptionSelected(event: MatAutocompleteSelectedEvent): void {
        this.selectedEmployees.push(event.option.value);
        this.employeeControl.setValue(null);
    }

    removeEmployee(employee: any[]): void {
        const index = this.selectedEmployees.indexOf(employee);

        if (index >= 0) {
            this.selectedEmployees.splice(index, 1);
        }
    }
    //End some test for autocompete with chips
}
