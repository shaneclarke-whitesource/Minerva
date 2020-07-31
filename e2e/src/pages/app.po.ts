import { browser, by, element } from "protractor";

export class AppPage {
  baseElement = {
    router: element(by.css("app-root router-outlet")),
  };

  navigateTo() {
    return browser.get(browser.baseUrl);
  }
  

  getRouter() {
    return this.baseElement.router;
  }

  getHelixNavCssClass() {
    return element(by.id("nav")).getAttribute("class");
  } 


}
