import { AppPage } from "../pageObjects/app.po";
import { element, by, browser } from "protractor";

describe("hx-Alert testing", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.ignoreSynchronization = true;
  });

  it("Should check if testing hx-alert element is present", async () => {
     page.navigateTo();
     browser.sleep(2000); 
     element(by.xpath("//hx-disclosure[@id='addResButton']")).click();
     browser.sleep(1000);
     element(by.xpath("//input[@id='txtResource']")).sendKeys("%%%");
     browser.sleep(1000);
     element(by.xpath("//button[@class='hxBtn hxPrimary']")).click();
     browser.sleep(2000);
     expect(element(by.tagName("hx-alert")).isPresent()).toBe(true);
 
  });
})