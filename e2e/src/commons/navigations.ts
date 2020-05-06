import { browser, by, element } from "protractor";

export class navigations 
{
    baseElement = 
  {
    root: element(by.css("#stage #nav")),  
  };
  
  async navigateToAll() 
   {
   
     element(by.xpath("//a[text()='Monitoring']")).click();
     browser.sleep(5000);
     // validate - add expect
     // expect(element(by.xpath("//a[text()='Monitoring']")).isPresent()).toBe(true);
     await this.baseElement.root.element(by.xpath("//a[text()='Visualize']")).click();
     browser.sleep(5000);
      // validate - add expect
     // expect(element(by.xpath("//a[text()='Visualize']")).isPresent()).toBe(true);
     await this.baseElement.root.element(by.xpath("//a[text()='Resources']")).click();
      browser.sleep(5000);
      //  validate - add expect
     // expect(element(by.xpath("//a[text()='Resources']")).isPresent()).toBe(true);

   
  }
  async loadresources()
  {
    browser.executeScript('window.scrollTo(0,10000);');
   
    
   var htmltable=element(by.xpath("//table[@class='hxTable']//tbody"));
//  rows=htmltable.findElements(by.tagName("tr"));
 
// for(int rnum=0;rnum<rows.size();rnum++)
// {
// List<WebElement> columns=rows.get(rnum).findElements(By.tagName("th"));
// System.out.println("Number of columns:"+columns.size());
 
// for(int cnum=0;cnum<columns.size();cnum++)
// {
// System.out.println(columns.get(cnum).getText());
// }
// }
      
 // }
  }
}

  