import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'calendarFilter'
})
export class CalendarFilterPipe implements PipeTransform {

    transform(value: string, filter): string {
        var datePipe = new DatePipe("en-GB");
        value = datePipe.transform(value, 'dd/MM/yyyy');
        return value;
    }
}
