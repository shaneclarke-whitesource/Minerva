import { TestBed, getTestBed } from "@angular/core/testing";
import {  HttpClientModule} from "@angular/common/http";
import { ZoneService } from "./zones.service";

describe("Zone Service",() =>{
    let injector : TestBed;
    let service: ZoneService;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[
                HttpClientModule
            ],
            providers:[
                ZoneService
            ]
        })
        injector= getTestBed();
        service = injector.get(ZoneService);
    });

    it("Service should initiated", (done) =>{
        expect(service).toBeTruthy();
        done();
    });
    it("Get zones", (done) =>{
        service.getZones().subscribe((data) => {
            expect(data.content.length).toBeGreaterThanOrEqual(7);
            done();
        })

    })


})