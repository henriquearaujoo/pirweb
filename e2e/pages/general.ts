import { browser, by, element } from 'protractor';

export class General {
  navigateTo() {
    return browser.get('http://localhost:4200/');
  }

}

