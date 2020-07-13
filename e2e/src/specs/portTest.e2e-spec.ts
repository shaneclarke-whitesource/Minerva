import { AppPage } from "../pageObjects/app.po";
import { navigations } from "../commons/navigations";
import { browser, element, by } from "protractor";

describe("Min Max Port field create monitor", () => {
  let page: AppPage;
  let nav: navigations;

  beforeEach(() => {
    page = new AppPage();
    nav = new navigations();
    page.navigateTo();
    nav.navigateToMonitor();
    browser.sleep(1000);
    element(by.xpath("//button[@class='hxBtn hxPrimary']")).click();
    element(by.xpath("//select[@id='selType']")).click();
    browser.sleep(1000);
    element(by.xpath("//select[@id='selType']//option[text()='NetResponse']")).click();
  });

  it("Testing when entered negative value check for validation message", ()=> {
    element(by.xpath("//input[@placeholder='port']")).sendKeys("-87644");
    browser.sleep(10000);
    var errMsg = element(by.xpath("//span[@class='required ng-star-inserted']"));
    expect(errMsg.getText()).toEqual("The minimum value to accept for this input 1");    
    
  });


  it("Testing when entered greater then 65535 value check for validation message", () => {
    element(by.xpath("//input[@placeholder='port']")).sendKeys("98765");
    browser.sleep(10000);
    var errMsg = element(by.xpath("//span[@class='required ng-star-inserted']"));
    expect(errMsg.getText()).toEqual("The maximum value to accept for this input 65535");
    
  });

  it("Testing the date time format for input fields should accept numeric value", () => {
     element(by.xpath("//input[@placeholder='timeout']")).sendKeys("80");
    element(by.xpath("//input[@placeholder='timeout']")).sendKeys("%$#");
    element(by.xpath("//input[@placeholder='readTimeout']")).sendKeys("120");
    element(by.xpath("//input[@placeholder='readTimeout']")).sendKeys("*&^");
    expect(element(by.xpath("//input[@placeholder='timeout']")).isPresent()).toBe(true);
    expect(element(by.xpath("//input[@placeholder='readTimeout']")).isPresent()).toBe(true)
 
});
});