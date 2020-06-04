import { Injectable } from "@angular/core";
import { CanActivate , Router} from "@angular/router";
import {PortalDataService  } from "../../../../../src/app/_services/portal/portal-data.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private prtDataSrvc: PortalDataService, private route:Router){

    }
      canActivate(): boolean {

        if(!!this.prtDataSrvc.portalData.isRacker){
            return true;
        }
        // this.route.navigate(['resources']);
        return true;
    }
}