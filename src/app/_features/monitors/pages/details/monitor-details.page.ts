import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonitorService } from '../../../../_services/monitors/monitor.service';

@Component({
  selector: 'app-monitor-detail',
  templateUrl: './monitor-details.page.html',
  styleUrls: ['./monitor-details.page.less']
})
export class MonitorDetailsPage implements OnInit {
  id: number;
  meta: {};
  //TODO: create Interface for a single Monitor - will be mapped to
  // service & response
  monitor: any = {};
  Object: Object = Object;

  constructor(private route: ActivatedRoute, private monitorService: MonitorService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.monitorService.getMonitor(this.id).subscribe(data => {
        this.monitor = data;
      });
    });
  }

}
