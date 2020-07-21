
import { browser } from "protractor";
import { async } from "@angular/core/testing";
import { AppPage } from "e2e/src/pages/app.po";
import { navigations } from "e2e/src/commons/navigations";


describe("App Navigations", () => {
  let nav: navigations;
  let page:AppPage;
  

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
