
import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { MonitorService } from "../../../../_services/monitors/monitor.service";
import { BoundMonitorPaging, BoundMonitor } from 'src/app/_models/resources';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/_services/spinner/spinner.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.component.html',
  styleUrls: ['./monitor-list.component.scss']
})
export class MonitorListComponent implements OnInit {
  total: number;
  page: number = 0;
  defaultAmount:number = environment.pagination.pageSize;
  isLoading: boolean = false;
  monitors:BoundMonitor[];
  @Input() resourceId:string;
  subscriber = new Subscription();

  constructor(private mntor:MonitorService) { }

  ngOnInit(): void {
    this.getMonitors();
  }

  getMonitors(){
    this.subscriber=this.mntor.getBoundMonitor({resourceId : this.resourceId, size: this.defaultAmount, page: this.page}).subscribe(data =>{      
      this.monitors= data.content;
      this.total = data.totalElements;
      //this.isLoading = false;
    })
  }

  /**
   * @description <app-pagination>
   * @param n number
   * @returns void
  */
  goToPage(n: number): void {
    this.page = n;
    //this.isLoading = true;
    this.getMonitors();
  }

  /**
   * @description <app-pagination>
   */
  nextPage(): void {
    this.page++;
    //this.isLoading = true;
    this.getMonitors();
  }

  /**
   * @description <app-pagination>
   */
  prevPage(): void {
    this.page--;
    //this.isLoading = true;
    this.getMonitors();
  }
  
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
