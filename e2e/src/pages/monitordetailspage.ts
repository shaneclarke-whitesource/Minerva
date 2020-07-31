import { element, by, WebElement } from "protractor"


export class monitorsDetailsPage
{
  public labelsInfoKeyDisplay(key:string){
     return(element(by.xpath("//div[contains(text(),'"+key+"')]")));
     
  }

  public labelsInfoValueDisplay(value:string){
    return(element(by.xpath("//div[contains(text(),'"+value+"')]")));
    }
  
}