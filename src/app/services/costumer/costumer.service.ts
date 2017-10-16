import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RestService } from '../rest/rest.service'

@Injectable()
export class CostumerService extends RestService {
  apiurl = 'http://localhost:18181/';

  constructor(http : Http) {
    super(http);
  }

  public getCostumers() {
    return this.get('http://localhost:18181/costumers');
  }
}
