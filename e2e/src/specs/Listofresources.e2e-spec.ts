import { navigations } from "../commons/navigations";
import { browser } from "protractor";
import { AppPage } from "../pageObjects/app.po";

describe("App Navigations", () => {
  let nav: navigations;
  let page: AppPage;

  beforeEach(() => {
    nav = new navigations();
    page = new AppPage();
  });

  it("should load all the resources", async() => 
  {
    page.navigateTo();
    await nav.loadresources();
    
  });
});