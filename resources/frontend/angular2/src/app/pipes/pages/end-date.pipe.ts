import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common'

@Pipe({
  name: 'endDate'
})
export class EndDatePipe implements PipeTransform {

    transform(data: any, filter: string): any {
        const searched_date = this.datepipe.transform(filter, 'YYYY-MM-dd');
        return (data.length === 0 || filter === '') ? data : data.filter(record => {
            return +new Date(record.end_date) <= +new Date(searched_date);
        });
    }

    constructor(
        public datepipe: DatePipe
    ) {
    }
}
