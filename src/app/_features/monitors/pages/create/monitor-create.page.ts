import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import  { transformKeyPairs } from '../../../../_shared/utils';
import { MonitorService } from 'src/app/_services/monitors/monitor.service.js';
import { LabelService } from '../../../../_services/labels/label.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { FormatMonitorUtil } from '../../mon.utils';
import { Router } from '@angular/router';
import { SchemaService } from 'src/app/_services/monitors/schema.service';


@Component({
  selector: 'app-monitor-create',
  templateUrl: './monitor-create.page.html',
  styleUrls: ['./monitor-create.page.scss']
})
export class MonitorCreatePage implements OnInit, OnDestroy {

  typesOfMonitors: string[];

  private labelSubmit: Subject<void> = new Subject<void>();
  private labelFormSubmit: Subject<boolean> = new Subject<boolean>();

  createMonitorForm: FormGroup;
  addMonLoading: false;
  updatedLabelFields: {[key: string] : any};
  subManager = new Subscription();

  listOfKeys = [];
  listOfValues = [];

  get mf() { return this.createMonitorForm.controls; }

  constructor(private monitorService: MonitorService, private fb: FormBuilder,
    private labelService: LabelService, private router: Router, private readonly schemaService: SchemaService) {

    }

    async ngOnInit() {
      await this.schemaService.loadSchema();
      this.typesOfMonitors = Object.keys(this.schemaService.schema.definitions);

      let labelServiceSub = this.labelService.getResourceLabels().subscribe(data => {
        this.listOfKeys = Object.keys(this.labelService.labels);
        this.listOfValues = Object.values(this.labelService.labels).flat();
      });

      this.createMonitorForm = this.fb.group({
        name: [''],
        type: ['', Validators.required]
      });

      let labelFormSubscrip = this.labelFormSubmit.subscribe((valid) => {
        if (!valid) {
          this.addMonLoading = false;
        }
        else {
          this.addMonitor();
        }
      });

      this.subManager.add(labelFormSubscrip);
      this.subManager.add(labelServiceSub);
  }

/*
 * @description Create a Monitor
 * @param monitorForm FormGroup
*/
  addMonitor(): void {
    if (!this.createMonitorForm.valid) {
      this.addMonLoading = false;
      return;
    }

    let formData = this.createMonitorForm.value;
    formData.labelSelector = this.updatedLabelFields;
    formData[this.createMonitorForm.get('type').value.toLowerCase()] = {};

    const formattedMonitor = FormatMonitorUtil(this.createMonitorForm.get('type').value, formData);
    const result = this.schemaService.validateData(formattedMonitor);

    if (result.isValid) {
      this.monitorService.createMonitor(formattedMonitor).subscribe(data => {
        this.addMonLoading = false;
        this.router.navigate(['/monitors']);
      }, (error) => this.addMonLoading = false);
    }
    else {
      this.addMonLoading = false;
    }
  }


  /*
   * @description Whenever updates are made to the form we retrieve values here
   * @param metaValues {[key: string] : any}
  */
  labelsUpdated(metaValues: {[key: string] : any}):void {
    this.updatedLabelFields = transformKeyPairs(metaValues.keysandvalues);
  }
/**
   * @description Marks all form fields as touched to show validation upon submission
   * @param formGroup FormGroup
*/
  private markFormGroupTouched() {
      (<any>Object).values(this.createMonitorForm.controls).forEach(control => {
        control.markAsTouched();
      });
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }


}
