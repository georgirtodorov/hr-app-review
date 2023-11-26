import {Pipe, PipeTransform} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";

@Pipe({
    name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

    transform(data: any[], page: PageEvent): any {
        return (page.pageSize >= page.length) ?
            data : data.slice(page.pageIndex * page.pageSize, (page.pageIndex * page.pageSize) + page.pageSize);
    }
}
