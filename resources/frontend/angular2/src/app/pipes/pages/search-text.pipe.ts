import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchText'
})
export class SearchTextPipe implements PipeTransform {

    transform(data: any, filter: string, field: string): any {
        // console.log(data, filter, field)
        return (data.length === 0 || filter === '') ? data : data.filter(record => {
            return record[field].toLowerCase().includes(filter.toLowerCase())
        });
    }
}
