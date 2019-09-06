import { Component, OnInit, Input } from '@angular/core';
import { MetricsService } from '../../../../_services/metrics/metrics.service';
import { IMeasurement, IMetricField, IDevice } from '../../../../_models/metrics';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-visualize-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.scss']
})
export class SelectionsComponent implements OnInit {

  // values from attributes of component
  @Input() system: string;
  @Input() measurement: string;
  @Input() device: string;
  @Input() start: string;
  @Input() end: string;

  // public fields
  measurements: IMeasurement[];
  selectedFields: IMetricField[];
  selectedDevices: IDevice[];
  selectedField: string;
  selectedDevice: string;
  filteredMeasurements: IMeasurement[];

  // manage subscriptions
  subManager = new Subscription();

  // getters will allow for binding values
  get systems(): string[] {
    return this.metricService.sensorSystems;
  }
  get initialSys(): string {
    return this.metricService.initialSystem;
  }

  constructor(private metricService: MetricsService) { }

  ngOnInit() {
    // susbscribe to the collections from metrics service
    let subMeasurements = this.metricService.metricMeasurements$().subscribe(
      (measurements) => {
        if (measurements) {
          this.measurements = measurements;
          this.filterMeasurements(measurements);
        }
    });

    let subFields = this.metricService.metricFields$().subscribe(
      fields => this.selectedFields = fields
    );

    let subDevices = this.metricService.metricDevices$().subscribe(
      devices => this.selectedDevices = devices
    );

    // consolidate all subscriptions to one for cleaner management
    this.subManager.add(subMeasurements);
    this.subManager.add(subFields);
    this.subManager.add(subDevices);
  }

  selectSystem(system:string) {
    this.system = system;
    this.filterMeasurements(this.measurements);
    this.metricService.changeSelectedSystem(system);
  };

  selectMeasurement(event: any) {
    this.measurement = event.target.value;
    this.metricService.getMetricFields(this.measurement).pipe(
      flatMap(fields => {
        return this.metricService.getDevices(fields[0].fieldKey, this.measurement,
          '6h', 'now()');
      })
    ).subscribe();
    this.metricService.changeSelectedMeasurement(this.measurement);
  };

  selectDevice(event:any) {
    this.selectedDevice = event.target.value;
    this.metricService.getMetrics(this.selectedField, this.measurement, '6h', 'now()',
    this.selectedDevice).subscribe();
    this.metricService.changeSelectedDevice(this.selectedDevice)
  }

  private filterMeasurements(measurements:IMeasurement[]):void {
    // get the system either from attribute or from the assigned default
    let sys = this.system || this.initialSys;
    let selected = measurements.filter((measurement: IMeasurement) => {
      return measurement.name.substring(0, measurement.name.indexOf("_")) ==
        sys;
    });
    this.filteredMeasurements = selected;
  }

  ngOnDestroy(): void {
    this.subManager.unsubscribe();
  }
}
