import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], filter: any): any[] {
    if (!list || !filter) {
      return list;
    }
    return list.filter((ob: any) => this.applyFilter(ob, filter));
  }

  applyFilter(obj: any, filter: any): boolean {
    for (const field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (obj[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
       }
      }
    }
    return true;
  }
}
