import { Pipe, PipeTransform } from '@angular/core';
import {Employee} from '../../classes/pages/Employee';

@Pipe({
  name: 'searchFirstName'
})
export class SearchFirstNamePipe implements PipeTransform {

    transform(employees: Employee[], filter: string): Employee[] {
        return (employees.length === 0 || filter === '') ? employees : employees.filter(employee => {
            return employee.first_name.toLowerCase().includes(filter.toLowerCase())
        });
    }

}
