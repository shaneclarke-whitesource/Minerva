import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../../../../_services/metrics/metrics.service';
import { GraphEngine } from 'hedwig-monitoring-library';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualize.page',
  templateUrl: './visualize.page.component.html',
  styleUrls: ['./visualize.page.component.scss']
})
export class VisualizePage implements OnInit {

  // private fields
  private system: string;
  private measurement: string;
  private device: string;
  private start: string;
  private end: string;


  // public fields
  loading: boolean;
  constructor(private metricService: MetricsService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.loading = true;

    this.route.queryParamMap.subscribe(queryParams => {
      this.system = queryParams.get('system');
      this.measurement = queryParams.get('measurement');
      this.device = queryParams.get('device');
      this.start = queryParams.get('start');
      this.end = queryParams.get('end');
    });

    this.metricService.getMeasurements().subscribe();

  }

}