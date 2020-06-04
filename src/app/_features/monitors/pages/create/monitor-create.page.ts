import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { MonitorService } from 'src/app/_services/monitors/monitor.service.js';
import { LabelService } from 'src/app/_services/labels/label.service';
import { SchemaService } from 'src/app/_services/monitors/schema.service';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../../interfaces/field.interface';
import { transformKeyPairs } from 'src/app/_shared/utils';
import { MonotorUtil,CntrlAttribute } from '../../mon.utils';
import { MarkFormGroupTouched } from "src/app/_shared/utils";
import { config as MonitorConfigs } from '../../config/index';
import { Animations } from 'src/app/_shared/animations';
import { Resource } from 'src/app/_models/resources';
import { duration } from "moment";
import { ResourcesService } from 'src/app/_services/resources/resources.service';
import { map } from 'rxjs/operators';
import { LoggingService } from 'src/app/_services/logging/logging.service';
import { LogLevels } from 'src/app/_enums/log-levels.enum';
import { AddFieldsComponent } from 'src/app/_shared/components/add-fields/add-fields.component';


@Component({
  selector: 'app-monitor-create',
  templateUrl: './monitor-create.page.html',
  styleUrls: ['./monitor-create.page.scss'],
  animations: [ Animations.slideUpDownTrigger ]
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
  additionalSettings: string = 'out';
  resources$ = new Observable<Resource[]>();

  showLabelSelectors = true;
change = false;
  // #ngForm reference needed for view
  get mf() { return this.createMonitorForm.controls; }

  get excludedResources() {
    return this.createMonitorForm.get('excludedResourceIds') as FormArray;
  }

  /**
   * Returns the total of pairs
   * @returns number
   */
  totalExcluded(): number {
    return this.excludedResources.length;
  }

  // viewchild for dynamic sub form for monitors
  @ViewChild(DynamicFormComponent) subForm: DynamicFormComponent;

  @ViewChild(AddFieldsComponent) labelSelectorForm: AddFieldsComponent;
  constructor(private monitorService: MonitorService, private fb: FormBuilder,
    private labelService: LabelService, private router: Router, private readonly schemaService: SchemaService,
    private resourceService: ResourcesService, private logService: LoggingService) {
    }

    ngOnInit() {
      this.typesOfMonitors = Object.keys(this.schemaService.schema.definitions);
      let labelServiceSub = this.labelService.getResourceLabels().subscribe(data => {
        this.listOfKeys = Object.keys(this.labelService.labels);
        this.listOfValues = Object.values(this.labelService.labels).flat();
      });

      this.createMonitorForm = this.fb.group({
        name: [''],
        type: ['', Validators.required],
        interval: [''],
        excludedResourceIds: this.fb.array([this.fb.group({
          resource: new FormControl('')})]),
        labelSelectorMethod: [''],
        resourceId: [''],
        policy: ['']
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
    this.createMonitorForm.value['labelSelector'] = this.updatedLabelFields || {};

    this.createMonitorForm.value['details'] = {
      type: MonitorConfigs[this.selectedMonitor].type,
      plugin: {
        type: MonotorUtil.ParseMonitorTypeEnum(this.schemaService.schema.definitions[this.selectedMonitor]),
        ...(this.subForm.value)
      }
    };

    // delete drop down selection value, it's not needed
    delete this.createMonitorForm.value[CntrlAttribute.type];

    Object.keys(this.createMonitorForm.value).forEach(key => {
      // delete any form fields that are empty strings
      this.createMonitorForm.value[key] === "" && delete this.createMonitorForm.value[key];
      // remove key string array of excludedResourceIds and replace with an array of strings
      if (key === 'excludedResourceIds') {
          let excluded = [];
          this.createMonitorForm.value[key].forEach((item, index) => {
            if (item.resource != "") {
              excluded.push(item.resource);
            }
          });
          // if there are strings in the array we'll include with the form, if not we'll delete the property
          if (excluded.length === 0) {
            delete this.createMonitorForm.value[key];
            // in this case we will also not need the label property
            delete this.createMonitorForm.value['labelSelector'];
          }
      }
    });

    this.parseInISO();
    const result = this.schemaService.validateData(this.createMonitorForm.value);
    if (result.isValid) {
      this.monitorService.createMonitor(this.createMonitorForm.value).subscribe(data => {
        this.addMonLoading = false;
        this.router.navigate(['/monitors']);
      }, (error) => {
        this.addMonLoading = false;
        this.logService.log(`Create monitor failed - ${JSON.stringify(error)}`, LogLevels.error)
      });
    }
    else {
      this.logService.log("Monitor data is invalid", LogLevels.error)
      this.addMonLoading = false;
    }
  }
  /**
   * @description parse interval numeric time values and convert to ISO Duration
   */
  parseInISO(): void {
    let definitions = this.schemaService.schema.definitions[this.selectedMonitor]
    for (var pr in this.schemaService.schema.definitions[this.selectedMonitor].properties) {
      if (definitions.properties[pr].hasOwnProperty(CntrlAttribute.format))
        if (this.createMonitorForm.value.details.plugin.hasOwnProperty(pr)) {
          this.createMonitorForm.value.details.plugin[pr] = duration(parseInt(this.createMonitorForm.value.details.plugin[pr]), 'seconds').toISOString();
        }
    }

    if (this.createMonitorForm.value.hasOwnProperty(CntrlAttribute.interval)) {
      this.createMonitorForm.value.interval = duration(parseInt(this.createMonitorForm.value.interval), 'seconds').toISOString()
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

  /**
   * Toggles div for showing additional settings & gets list of resources
   */
  showAdditionalSettings(): void {
    this.additionalSettings = this.additionalSettings === 'in' ? 'out': 'in';
    this.resources$ = this.resourceService.resourceItems.pipe(
      map((items) => {
        return items;
      })
    );
    //TODO: This function will eventually need some kind of paging component with endless
    // scroll or a similar mechanism
    this.resourceService.getResources(25, 0).subscribe();
  }

  /**
   * Adds new dropdown control to array of formcontrols
   */
  addExcludedResource() {
    this.excludedResources.push(this.fb.group({
      resource: new FormControl('')
    }));
  }

  deleteExcludedResource(index) {
    this.excludedResources.removeAt(index);
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
}
