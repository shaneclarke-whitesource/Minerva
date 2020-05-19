import { navigations } from "../commons/navigations";
import { browser, element, by } from "protractor";
import { AppPage } from "../pageObjects/app.po";
import { async } from "@angular/core/testing";
import { LoadResources } from "../feature/Resources/ListOfResources";
import * as fs from 'fs';
import * as path from 'path';

describe("Resources List", () => {
    let page: AppPage;
  let check: LoadResources;

  beforeEach(() => {
    page = new AppPage();
    check = new LoadResources();
    page.navigateTo();
  });

  it("Check if check box is enabled" , async() => {
    
    expect(element(by.xpath("//th[@class='hxControl']//hx-checkbox-control//label//hx-checkbox")).isPresent());
  });

  it("Check if Delete button is enabled" , async() => {
    
    element.all(by.xpath("//th[@class='hxControl']//hx-checkbox-control//label//hx-checkbox")).click();
    browser.sleep(20000);
    expect(element(by.xpath("//button[contains(text(),'Delete')]")).isEnabled()).toBe(true);
  });

  it("check if Create Muiltiple Monitores button is enabled", async() => {
    
    
        element.all(by.xpath("//th[@class='hxControl']//hx-checkbox-control//label//hx-checkbox")).click();
        browser.sleep(20000);
        expect(element(by.xpath("//button[contains(text(),'Create Multiple Monitors')]")).isEnabled()).toBe(true);
       
  });

  it("check if Create Supression button is enabled",  async() => {
    
   element.all(by.xpath("//th[@class='hxControl']//hx-checkbox-control//label//hx-checkbox")).click();
    browser.sleep(20000);
    expect(element(by.xpath("//button[contains(text(),'Create Suppression')]")).isEnabled()).toBe(true);
  });
 it("should have Add resources button", async() => {
   
  expect(element(by.xpath("//hx-disclosure[@id='addResButton']")).isEnabled()).toBe(true);

 });
 it("Once add resources should have Submit button enabled", async()=>{
   element(by.xpath("//hx-disclosure[@id='addResButton']")).click();
  expect(element(by.xpath("//button[@class='hxBtn hxPrimary']")).isEnabled()).toBe(true);

 });
 it("Once Add resources button is clicked cancel button should be enabled", async()=>{
  element(by.xpath("//hx-disclosure[@id='addResButton']")).click();
  expect(element(by.xpath("//button[contains(text(),'Cancel')]")).isEnabled()).toBe(true);
  
 });
 it("Add Resources button clicked should have text box",async()=>{
  element(by.xpath("//hx-disclosure[@id='addResButton']")).click();
  expect(element(by.xpath("//input[@id='txtResource']")).isPresent()).toBe(true);
 });
 it("Should have enabled Presence Monitor checkbox", async()=>{
  element(by.xpath("//hx-disclosure[@id='addResButton']")).click();
  
  expect(element(by.xpath("//label[contains(text(),'Enable Presence Monitoring')]")).isPresent()).toBe(true);
 });
 it("Should have search option", async()=>{
   expect(element(by.xpath("//input[@id='txtSearch']")).isPresent()).toBe(true);
});

it("Should Capture Data", async()=>{
    var arrRows = await element(by.css("table.hxTable tbody")).all(by.tagName("tr"));
    var data = "";
    for(var i=0;i<arrRows.length;i++) {
        var arrCols = await arrRows[i].all(by.tagName("td"));
        for(var j=0;j<arrCols.length;j++) {
            data = data + await arrCols[j].getText() + "\t\t";
        }
        data = data + "\n";
    }
    //console.log(data);
    fs.writeFile(path.join(__dirname,'../output/CaptureData.txt'),data,(err) => {
      if(err) throw err;
            })
  });


})