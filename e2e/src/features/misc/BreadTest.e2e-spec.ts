
import { browser, element, by } from "protractor";
import { AppPage } from "../../pages/app.po";

describe("Breadcrumb testing in resources", () => {
  let page: AppPage;
  

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    
  });

it("Should check breadcrumb is present ",async()=>{
   element(by.xpath("//tr[1]//td[2]//a[1]")).click();
    var breadcramb = element(by.xpath("//nav[@class='hxBreadcrumb']"));
   var Atribute = await breadcramb.getAttribute("className");
   expect(Atribute).toEqual("hxBreadcrumb");

  });
  

it("Should check breadcrumb link is navigating" ,()=>{
   element(by.xpath("//tr[1]//td[2]//a[1]")).click();
   var breadcramb=element(by.xpath("//nav[@class='hxBreadcrumb']"));
  expect(breadcramb.getText()).toEqual("RESOURCES\ndevelopment:0");
});

it("Should check breadcrumb link is navigating and then back to rescources" ,()=>{
  element(by.xpath("//tr[1]//td[2]//a[1]")).click();
  element(by.xpath("//a[@class='active']")).click();
 expect(element(by.xpath("//h2[contains(text(),'Resources')]")).isPresent()).toBe(true);
});

it ("Should check if href is present is 1st page" ,async() =>{
   var path =  element.all(by.xpath("//table[@class='hxTable']//tbody//tr//td[2]"));
   var colNum = await path.getAttribute("href");
   expect(colNum.length).toEqual(25);    
});

it("Should check if href is present is 2nd page" , async() =>{
  element(by.xpath("//button[@class='hxBtn nextPage']")).click();
  var path =  element.all(by.xpath("//table[@class='hxTable']//tbody//tr//td[2]"));
  var colNum = await path.getAttribute("href");
  expect(colNum.length).toEqual(25);
});

it ("Should check if href is present is 3rd page" , async() =>{
  element(by.xpath(" //button[contains(text(),'3')]")).click();
  var path =  element.all(by.xpath("//table[@class='hxTable']//tbody//tr//td[2]"));
var colNum = await path.getAttribute("href");
expect(colNum.length).toEqual(4);
});
});
