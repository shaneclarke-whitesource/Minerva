import { element, by } from "protractor"


export class monitorsListPage
{


   public paginationLastPageButton(){
        return(element(by.xpath("//button[@class='hxBtn lastPage']")));
    }

    public paginationNextPageButton(){
        return(element(by.xpath("//button[@class='hxBtn nextPage']")));
    }

    public paginationFirstPageButton(){
        return(element(by.xpath("//button[@class='hxBtn firstPage']")));
    }

    public paginationPreviousPageButton(){
        return(element(by.xpath("//button[@class='hxBtn prevPage']")));
    }

    public firstPageButton(){
        return(element(by.xpath("//button[@class='hxBtn' and contains(text(),'1')]")));
    }
    
    public SecondPageButton(){
        return(element(by.xpath("//button[@class='hxBtn' and contains(text(),'2')]")));
    }
}