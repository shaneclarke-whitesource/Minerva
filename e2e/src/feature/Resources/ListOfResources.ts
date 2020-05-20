import { browser, by, element, Button,ElementFinder } from "protractor";
import { enableDebugTools } from "@angular/platform-browser";
import { ValueConverter } from "@angular/compiler/src/render3/view/template";


export class LoadResources 
{
    baseElement = 
  {
    root: element(by.css("#stage #nav")),  
  };
// async checkbox()
//   {
//  // It will click on checkbox 
//  //element.all(by.xpath("//th[@class='hxControl']//hx-checkbox-control//label//hx-checkbox")).click();
 
//  expect(element(by.xpath("//th[@class='hxControl']//hx-checkbox-control//label//hx-checkbox")).isPresent());
//  expect(element(by.xpath("//button[contains(text(),'Delete')]")).isEnabled()).toBe(true);
//  expect(element(by.xpath("//button[contains(text(),'Create Multiple Monitors')]")).isEnabled()).toBe(true);
//  expect(element(by.xpath("//button[contains(text(),'Create Multiple Monitors')]")).isEnabled()).toBe(true);

//   };

  async resourcesTable() 
  {
    var page1 = element.all(by.xpath("//table[@class='hxTable']//tbody//tr"));
    var count1 = await page1.getAttribute("childElementCount");
  console.log("count of 1st page"+count1.length);
  expect(element(by.xpath("//table[@class='hxTable']//tbody//tr")).isPresent()).toEqual(25);
  }
}
   