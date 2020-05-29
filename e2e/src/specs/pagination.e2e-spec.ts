import { browser, element, by } from "protractor";
import { AppPage } from "../pageObjects/app.po";
import { async } from "@angular/core/testing";
import { LoadResources } from "../feature/Resources/ListOfResources";


describe("Pagination Test", () => {
        let page: AppPage;
        

  beforeEach(() => {
    page = new AppPage();
    
    page.navigateTo();
   
    
  });

  it("Should check if lastPage button is navigating", ()=>
  {
    var nxtbtn = element(by.xpath("//button[@class='hxBtn lastPage']")).click();
    element.all(by.xpath("//table[@class='hxTable']//tbody//tr")).then(function(Rows3)
  {
    var r3=Rows3.length;
    expect(r3).toEqual(4);
})

  });  

  it("Should check if firstpage button is navigating", async()=>
  {
    var path =  element.all(by.xpath("//button[contains(text(),'1')]")).click();
    element(by.xpath("//button[@class='hxBtn firstPage']")).click();

    var page1 = element.all(by.xpath("//table[@class='hxTable']//tbody//tr"));

    var size = (await page1).length;
    expect(size).toEqual(25);
   
  });  

  it("Should check if nextpage button is navigating", ()=>
  {
    element(by.xpath("//button[contains(text(),'2')]")).click();
    element(by.xpath("//button[@class='hxBtn nextPage']")).click();
    expect(element(by.xpath("//button[@class='hxBtn nextPage']")).isPresent()).toBe(true);

  });  

  it("Should check if previous-page button is navigating", ()=>
  {
    element(by.xpath("//button[contains(text(),'3')]")).click();
    element(by.xpath("//button[@class='hxBtn prevPage']")).click();
    expect(element(by.xpath("//button[@class='hxBtn prevPage']")).isPresent()).toBe(true);
  });  

it("Should Populate first page", async()=>
{
  var path =  element.all(by.xpath("//button[contains(text(),'1')]")).click();
  var page1 = element.all(by.xpath("//table[@class='hxTable']//tbody//tr"));

    var size = (await page1).length;
    expect(size).toEqual(25);
});

it("Should Populate second page", async()=>
{
  var path =  element.all(by.xpath("//button[contains(text(),'2')]")).click();
  var page1 = element.all(by.xpath("//table[@class='hxTable']//tbody//tr"));
  browser.sleep(1000);
    var size = (await page1).length;
    expect(size).toEqual(25);
});

it("Should Populate third page", ()=>
{
  var path =  element.all(by.xpath("//button[contains(text(),'3')]")).click();
  element.all(by.xpath("//table[@class='hxTable']//tbody//tr")).then(function(Rows3)
  {
    var r3=Rows3.length;
    expect(r3).toEqual(4);
})
});



it("Should check if first page button is disabled on initial load",()=>
{

expect(element(by.xpath("//button[@class='hxBtn firstPage']")).isEnabled()).toBe(false);
});

it("Should check if previous page button is disabled on initial load",()=>
{

expect(element(by.xpath("//button[@class='hxBtn prevPage']")).isEnabled()).toBe(false);
});

it("Should check if last page button is enabled on initial load",()=>
{

expect(element(by.xpath("//button[@class='hxBtn lastPage']")).isEnabled()).toBe(true);

});

it("Should check if next page button is enabled on initial load",()=>
{

expect(element(by.xpath("//button[@class='hxBtn nextPage']")).isEnabled()).toBe(true);
});

it("Should check if last-page button is disabled on navigating to last page",()=>
{
  element(by.xpath("//button[@class='hxBtn lastPage']")).click();
expect(element(by.xpath("//button[@class='hxBtn lastPage']")).isEnabled()).toBe(false);
});

it("Should check if next-page button is disabled on navigating to last page",()=>
{
  element(by.xpath("//button[@class='hxBtn lastPage']")).click();
expect(element(by.xpath("//button[@class='hxBtn nextPage']")).isEnabled()).toBe(false);
});

it("Should check if first-page button is enabled on navigating to last page",()=>
{
  element(by.xpath("//button[@class='hxBtn lastPage']")).click();
expect(element(by.xpath("//button[@class='hxBtn firstPage']")).isEnabled()).toBe(true);
});

it("Should check if previous-page button is enabled on navigating to last page",()=>
{
  element(by.xpath("//button[@class='hxBtn lastPage']")).click();
expect(element(by.xpath("//button[@class='hxBtn prevPage']")).isEnabled()).toBe(true);
});

})
