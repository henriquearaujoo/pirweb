import { Profile } from './../../../models/profile';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  pure: false
})
export class ProfilePipe implements PipeTransform {

  transform(profiles: Profile[], filter: Profile): Profile[] {
    if (!profiles || !filter) {
      return profiles;
    }
    return profiles.filter((profile: Profile) => this.applyFilter(profile, filter));
  }

  applyFilter(profile: Profile, filter: Profile): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (profile[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
       }
      }
    }
    return true;
  }
}
