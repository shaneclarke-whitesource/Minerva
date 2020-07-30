import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { monitorsListPage } from "../../../pages/monitorlistpage";
import { monitorsDetailsPage } from "../../../pages/monitordetailspage";
import { browser } from "protractor";
// import { default as obj } from "../../../../object.json";
import { default as using } from "../../../../../node_modules/jasmine-data-provider";
import { default as obj } from "../../../../../src/app/_mocks/monitors/single.json";





describe("Test label field display on Monitor's details page", function () {
   let page: AppPage;
   let nav: navigations;
   let page1: monitorsListPage;
   let page2: monitorsDetailsPage;

   beforeAll(() => {
      page = new AppPage();
      page.navigateTo();

   });

   beforeEach(() => {
      nav = new navigations();
      nav.navigateToMonitor();
      browser.sleep(5000);
      page1 = new monitorsListPage();
      page1.monitorName().click();
      browser.sleep(5000);
      page2 = new monitorsDetailsPage();

   });

   var labelKeys = Object.keys(obj.labelSelector);
   console.log(labelKeys);

   using([{ key: labelKeys[0], value: obj.labelSelector[labelKeys[0]]}, { key: labelKeys[1], value: obj.labelSelector[labelKeys[1]] }, 
      { key: labelKeys[2], value: obj.labelSelector[labelKeys[2]] }, { key: labelKeys[3], value: obj.labelSelector[labelKeys[3]] }], (data) => {

      fit(`Verify that monitor details page displays ${data.key} label info`, () => {
         expect(page2.labelsInfoKeyDisplay(data.key).isDisplayed()).toBe(true);
         expect(page2.labelsInfoValueDisplay(data.value).isDisplayed()).toBe(true);
         browser.sleep(3000);
      });


   });
});
