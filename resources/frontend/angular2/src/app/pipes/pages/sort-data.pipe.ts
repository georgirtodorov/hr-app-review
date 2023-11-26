import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common'

@Pipe({
    name: 'sortData',
    pure: false
})
export class SortDataPipe implements PipeTransform {

    private fields = {
        'dates': [
            'start_date',
            'end_date'
        ],
        'texts': [
            'first_name',
            'last_name',
            'position',
            'department',
            'location',
        ],
        'numerical': [
            'cost',
            'days'
        ]
    }

    transform(data: any, field: string, action: string): any {
        if (this.fields.dates.includes(field)) {
            return action === 'descending' ?
                data.sort((a, b) => new Date(b[field]).getTime() - new Date(a[field]).getTime()) :
                data.sort((a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime());
        }
        if (this.fields.texts.includes(field)) {
            return action === 'descending' ?
                data.sort((a, b) => b[field].localeCompare(a[field])) :
                data.sort((a, b) => a[field].localeCompare(b[field]));
        }
        return action === 'descending' ?
            data.sort((a, b) => b[field] - a[field]) :
            data.sort((a, b) => a[field] - b[field]);
    }
}
