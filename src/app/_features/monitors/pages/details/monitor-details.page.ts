import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonitorService } from '../../../../_services/monitors/monitor.service';

declare const window: any;

@Component({
  selector: 'app-monitor-detail',
  templateUrl: './monitor-details.page.html',
  styleUrls: ['./monitor-details.page.scss']
})
export class MonitorDetailsPage implements OnInit {
  id: number;
  meta: {};
  //TODO: create Interface for a single Monitor - will be mapped to
  // service & response
  monitor: any = {};
  Object = window.Object;

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
