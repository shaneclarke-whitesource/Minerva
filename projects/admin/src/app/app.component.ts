import { Component } from '@angular/core';
import { PortalDataService } from 'src/app/_services/portal/portal-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  name: string;
  // constructor(public prtDataSrvc: PortalDataService) {
  //   this.name = this.prtDataSrvc.portalData.username;
  // }
}
