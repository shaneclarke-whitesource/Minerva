import { Component, OnInit, Input } from '@angular/core';
import { MetricsService } from '../../../../_services/metrics/metrics.service';

@Component({
  selector: 'app-visualize-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.scss']
})
export class SelectionsComponent implements OnInit {

  @Input() system: string;
  @Input() measurement: string;
  @Input() device: string;
  @Input() start: string;
  @Input() end: string;

  constructor(private metricService: MetricsService) { }

  ngOnInit() { }

}
