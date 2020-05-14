import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  Subject, Subscription } from 'rxjs';
import { MonitorService } from 'src/app/_services/monitors/monitor.service.js';
import { LabelService } from 'src/app/_services/labels/label.service';
import { SchemaService } from 'src/app/_services/monitors/schema.service';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../../interfaces/field.interface';
import { transformKeyPairs } from 'src/app/_shared/utils';
import { MonotorUtil } from '../../mon.utils';
import { MarkFormGroupTouched } from "src/app/_shared/utils";
import { config as MonitorConfigs } from '../../config/index';


@Component({
  selector: 'app-monitor-create',
  templateUrl: './monitor-create.page.html',
  styleUrls: ['./monitor-create.page.scss']
})
export class MonitorCreatePage implements OnInit, OnDestroy {

  private labelSubmit: Subject<void> = new Subject<void>();
  private labelFormValid: Subject<boolean> = new Subject<boolean>();
  private dynamicFormSubmit: Subject<void> = new Subject<void>();
  private dynamicFormValid: Subject<boolean> = new Subject<boolean>();

  createMonitorForm: FormGroup;
  addMonLoading: boolean = false;
  updatedLabelFields: {[key: string] : any} = null;
  subManager = new Subscription();
  dynaConfig: FieldConfig[] = [];

  listOfKeys = [];
  listOfValues = [];
  typesOfMonitors: string[] = [];
  selectedMonitor = null;
  markFormGroupTouched = MarkFormGroupTouched;

  // #ngForm reference needed for view
  get mf() { return this.createMonitorForm.controls; }

  // viewchild for dynamic sub form for monitors
  @ViewChild(DynamicFormComponent) subForm: DynamicFormComponent;


  constructor(private monitorService: MonitorService, private fb: FormBuilder,
    private labelService: LabelService, private router: Router, private readonly schemaService: SchemaService) {
    }

    ngOnInit() {
      this.typesOfMonitors = Object.keys(this.schemaService.schema.definitions);
      let labelServiceSub = this.labelService.getResourceLabels().subscribe(data => {
        this.listOfKeys = Object.keys(this.labelService.labels);
        this.listOfValues = Object.values(this.labelService.labels).flat();
      });

      this.createMonitorForm = this.fb.group({
        name: [''],
        type: ['', Validators.required]
      });

      let labelFormSubscrip = this.labelFormValid.subscribe((valid) => {
        if (!valid) {
          this.addMonLoading = false;
        }
        else {
          this.dynamicFormSubmit.next();
        }
      });

      let subFormValidSubscrip = this.dynamicFormValid.subscribe((valid) => {
        if (!valid) {
          this.addMonLoading = false;
        }
        else {
          this.addMonitor();
        }
      });

      this.subManager.add(labelServiceSub);
      this.subManager.add(labelFormSubscrip);
      this.subManager.add(subFormValidSubscrip);
  }

/**
 * @description Create a Monitor
 * @param monitorForm FormGroup
*/
  addMonitor(): void {

    // If form is invalid return
    if (!this.createMonitorForm.valid) {
      this.addMonLoading = false;
      return;
    }

    // add selector label fields
    if (this.updatedLabelFields) {
      this.createMonitorForm.value['labelSelector'] = this.updatedLabelFields;
    }

    this.createMonitorForm.value['details'] = {
      type: MonitorConfigs[this.selectedMonitor].type,
      plugin: {
        type: MonotorUtil.ParseMonitorTypeEnum(this.schemaService.schema.definitions[this.selectedMonitor]),
        ...(this.subForm.value)
      }
    };

    // delete drop down selection value, it's not needed
    delete this.createMonitorForm.value['type'];
    const result = this.schemaService.validateData(this.createMonitorForm.value);
    if (result.isValid) {
      this.monitorService.createMonitor(this.createMonitorForm.value).subscribe(data => {
        this.addMonLoading = false;
        this.router.navigate(['/monitors']);
      }, (error) => this.addMonLoading = false);
    }
    else {
      this.addMonLoading = false;
    }
  }

  /**
   * @description Whenever updates are made to the form we retrieve values here
   * @param metaValues {[key: string] : any}
  */
  labelsUpdated(metaValues: {[key: string] : any}):void {
    this.updatedLabelFields = transformKeyPairs(metaValues.keysandvalues);
  }

  /**
   * @description loads the appropriate monitor form based on selection
   * @param value dropdown selection event.target.value
   */
  loadMonitorForm(value: any) {
    this.selectedMonitor = value;
    let definitions = this.schemaService.schema.definitions[this.selectedMonitor];
    this.dynaConfig = MonotorUtil.CreateMonitorConfig(definitions);
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
}
