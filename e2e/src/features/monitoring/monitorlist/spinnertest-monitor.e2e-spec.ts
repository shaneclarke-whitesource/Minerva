import { AppPage } from "../../../pages/app.po"
import { navigations } from "../../../commons/navigations";
import { monitorsListPage } from "../../../pages/monitorlistpage";
import { browser, element, by, WebElement, ExpectedConditions, protractor} from "protractor";


describe("Test page loading/spinner functionality",()=>{

    let page:AppPage;
    let nav:navigations;
    let page1:monitorsListPage;

    beforeAll(()=>{
       page=new AppPage();
       page.navigateTo();
       
    });
    
   //  beforeEach(()=>{
   //     nav=new navigations();
      //  nav.navigateToMonitor();
   //     browser.sleep(2000);
   //    //  page1=new monitorsListPage();

   //  });


    fit("Verify if spinner is present while navigating to monitor list page",()=>{
    //   browser.sleep(2000);
    // //   console.log(page1.spinner().isPresent());
    //   console.log("checking status:", page1.spinner().isDisplayed());
    //   expect(page1.spinner().isDisplayed()).toBe(true);
      browser.sleep(15000);
      element(by.xpath("//a[text()='Monitoring']")).click();
      browser.sleep(120000);
      var until = protractor.ExpectedConditions;
      browser.wait(until.visibilityOf(element(by.xpath("//div[@class='spinner-overlay']/following-sibling::hx-busy"))), 20000, 'Element taking too long to appear in the DOM');
      // browser.pause();
      // browser.sleep(5000);
      element(by.xpath("//div[@class='spinner-overlay']/following-sibling::hx-busy")).isPresent().then(function(result){
            console.log("results is:"+JSON.stringify(result));
            expect(result).toBe(true);
          });

          

        // var EC = protractor.ExpectedConditions;
        // var spinner = element(by.xpath("//div[@class='spinner-overlay']/following-sibling::hx-busy"));
        // browser.wait(EC.visibilityOf(spinner));
        // expect(spinner.isDisplayed()).toBe(true);
        // browser.close();
     


  });
});