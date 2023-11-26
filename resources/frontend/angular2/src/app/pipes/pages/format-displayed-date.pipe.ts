import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'formatDisplayedDate'
})
export class FormatDisplayedDatePipe implements PipeTransform {

    transform(value: string): string {
        var datePipe = new DatePipe("en-GB");
        value = datePipe.transform(value, 'dd/MM/yyyy');
        return value;
    }
}
