import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../../../../_services/metrics/metrics.service';
import { GraphEngine } from 'hedwig-monitoring-library';

@Component({
  selector: 'app-visualize.page',
  templateUrl: './visualize.page.component.html',
  styleUrls: ['./visualize.page.component.scss']
})
export class VisualizePage implements OnInit {

  graphType: string;
  measurements:any;
  constructor(private metricsService: MetricsService) { }

  ngOnInit() {
    // needed on components that utilize Hedwig
    // new GraphEngine();

    this.metricsService.getMeasurements().subscribe(
      measurements => this.measurements = measurements
    );
  }

}
