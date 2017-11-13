import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../../models/user';

@Pipe({
  name: 'filterUserBy',
  pure: false
})
export class UserPipe implements PipeTransform {

  transform(users: User[], filter: User): User[] {
    if (!users || !filter) {
      return users;
    }
    return users.filter((user: User) => this.applyFilter(user, filter));
  }

  applyFilter(user: User, filter: User): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (user[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
       }
      }
    }
    return true;
  }
}
