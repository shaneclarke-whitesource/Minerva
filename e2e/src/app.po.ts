import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getRouter() {
    return element(by.css('app-root router-outlet'));
  }

  getHelixNavCssClass() {
    return element(by.id('nav')).getAttribute('class');
  }
}
