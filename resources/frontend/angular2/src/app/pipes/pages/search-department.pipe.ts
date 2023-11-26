import { Pipe, PipeTransform } from '@angular/core';
import {Employee} from '../../classes/pages/Employee';

@Pipe({
  name: 'searchDepartment'
})
export class SearchDepartmentPipe implements PipeTransform {

    transform(employees: Employee[], filter: string): Employee[] {
        return (employees.length === 0 || filter === '') ? employees : employees.filter(employee => {
            return employee.department.toLowerCase().includes(filter.toLowerCase())
        });
    }
}
