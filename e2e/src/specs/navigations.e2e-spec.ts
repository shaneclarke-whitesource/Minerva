import { navigations } from "../commons/navigations";
import { browser } from "protractor";
import { AppPage } from "../pageObjects/app.po";
import { async } from "@angular/core/testing";
import { LoadResources } from "../feature/Resources/ListOfResources";

describe("App Navigations", () => {
  let nav: navigations;
  let page: AppPage;
  

  beforeEach(() => {
    nav = new navigations();
    page = new AppPage();
    page.navigateTo();
   
  });

  it("should navigate to Resources", async() => {
    
    await nav.navigateToResources();  
   
  });

  it("should navigate to Monitoring", async() => {
    
    await nav.navigateToMonitor();  
  });
  it("should navigate to Visulize", async() => {
    
    await nav.navigateToVisualize();  
  });
  it("should load HelixUI loads with app", async() =>{
    
    await nav.heliuxUIloads();
  });
  
  

});
