
import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { MonitorService } from "../../../../_services/monitors/monitor.service";
import { BoundMonitorPaging, BoundMonitor } from 'src/app/_models/resources';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/_services/spinner/spinner.service';
@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.component.html',
  styleUrls: ['./monitor-list.component.scss']
})
export class MonitorListComponent implements OnInit {
  total:any;
  page:any;
  defaultAmount:any;
  monitors:BoundMonitor[];
  @Input() resourceId:string;
  subscriber = new Subscription();

  constructor(private mntor:MonitorService, private spnService: SpinnerService) { this.spnService.changeLoadingStatus(true); }

  ngOnInit(): void {
    this.getMonitors();
  }

  getMonitors(){
    this.subscriber=this.mntor.getBoundMonitor(this.resourceId, "").subscribe(data =>{      
      this.monitors= data.content;
      this.spnService.changeLoadingStatus(false);
    })
  }
  
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
