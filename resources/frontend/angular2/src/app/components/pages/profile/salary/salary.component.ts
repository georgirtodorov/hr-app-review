import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {SalariesService} from "../../../../services/pages/salaries/salaries.service";
import {SwalService} from "../../../../services/helpers/swal/swal.service";

@Component({
    selector: 'salary',
    templateUrl: './salary.component.html',
    styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit
{

    @Input() employee_id: number
    @Input() salary: number

    constructor(private salaries_service: SalariesService, private swal_service: SwalService)
    {
    }

    ngOnInit(): void
    {
        if (!this.salary) {
            this.salaries_service.getSalary(this.employee_id).subscribe(r => this.salary = r?.gross_salary)
        }
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        // Handle changes to the employee_id input
        if (changes.employee_id && !this.salary) {
            this.salaries_service.getSalary(this.employee_id).subscribe(r => this.salary = r?.gross_salary);
        }
    }

    save() {
        const salaryInput = document.getElementById('salaryInput') as HTMLInputElement;
        const salaryError = document.getElementById('salaryError');

        // Regular expression to match a valid float number
        const floatPattern = /^-?\d+(\.\d+)?$/;

        if (floatPattern.test(salaryInput.value)) {
            // Input is a valid float number, you can proceed with saving
            salaryError.textContent = '';
            // Your save logic here
            if (this.employee_id) {
                this.salaries_service.setSalary(this.employee_id, this.salary).subscribe(r => {
                    if (!r) {
                        this.swal_service.error({text: 'Възникна грешка, моля опитайте по-късно.'})
                    } else {
                        this.swal_service.success({text: 'Промените са актуализирани.'})
                    }
                })
            } else  {
                this.swal_service.error({text: 'Възникна грешка, моля опитайте по-късно.'})
            }
        } else {
            // Input is not a valid float number, display an error message
            salaryError.textContent = 'Брутната заплата трябва да бъде число.';
        }
    }
}
