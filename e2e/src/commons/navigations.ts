import { browser, by, element } from "protractor";
import { enableDebugTools } from "@angular/platform-browser";


export class navigations 
{
    baseElement = 
  {
    root: element(by.css("#stage #nav")),  
  };
  
  async navigateToAll() 
   {
   // clicking on Monitor
     element(by.xpath("//a[text()='Monitoring']")).click();
     browser.sleep(5000);
     // validate - add expect for Monitor
     expect(element(by.xpath("//h2[contains(text(),'Monitors')]")).isPresent()).toBe(true);

     //clicking on visualize
     await this.baseElement.root.element(by.xpath("//a[text()='Visualize']")).click();
     browser.sleep(5000);
      // validate - add expect visualize
      expect(element(by.xpath("//a[@class='active']")).isPresent()).toBe(true);

    
      // clicking on resources
     await this.baseElement.root.element(by.xpath("//a[text()='Resources']")).click();
      browser.sleep(5000);
      //  validate - add expect for resources
      expect(element(by.xpath("//h2[contains(text(),'Resources')]")).isPresent()).toBe(true);

   
  }
  

async heliuxUIloads()
{
  // HelixUI link tag is expected to be 2nd link element
  var link = element(by.xpath("//head//link[2]"));
  var hre= await link.getAttribute("href");
 //validation basd on url. 
 
 expect(hre.indexOf('helix-ui.css')).toBeGreaterThan(0);
}
   
    
}

  