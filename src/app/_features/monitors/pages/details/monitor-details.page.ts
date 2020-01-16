import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonitorService } from '../../../../_services/monitors/monitor.service';
import { Observable } from 'rxjs';
import { Monitor } from 'src/app/_models/monitors';

declare const window: any;

@Component({
  selector: 'app-monitor-detail',
  templateUrl: './monitor-details.page.html',
  styleUrls: ['./monitor-details.page.scss']
})
export class MonitorDetailsPage implements OnInit {
  id: string;

  monitor$: Observable<Monitor>;
  Object = window.Object;

  constructor(private route: ActivatedRoute, private monitorService: MonitorService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.monitor$ = this.monitorService.getMonitor(this.id);
    });
  }

}
