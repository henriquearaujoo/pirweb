import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class ProfilePipe implements PipeTransform {

  transform(profiles: any, searchText: any): any {
    if (searchText == null) { return profiles; }

   return profiles.filter (function(category){
     return category.CategoryName.toUpperCase().indexOf(searchText) > -1;
   });
 }

}
