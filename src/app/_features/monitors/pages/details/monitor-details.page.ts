import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animations } from 'src/app/_shared/animations';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { MonitorService } from 'src/app/_services/monitors/monitor.service';
import { Monitor } from 'src/app/_models/monitors';
import { SchemaService } from 'src/app/_services/monitors/schema.service';
import { MonotorUtil, CntrlAttribute } from '../../mon.utils';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { tap, map } from 'rxjs/operators';
import { duration} from "moment";
import { FieldConfig } from '../../interfaces/field.interface';
import { SpinnerService } from 'src/app/_services/spinner/spinner.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AdditionalSettingsComponent } from '../../components/additional-settings/additional-settings.component';
import { DurationSecondsPipe } from 'src/app/_shared/pipes/duration-seconds.pipe';
import { Resources, Resource } from 'src/app/_models/resources';
import { ResourcesService } from 'src/app/_services/resources/resources.service';


declare const window: any;
export enum UpdateSection {
  additional = "additional",
  name = "name",
  plugin = "plugin"
}

@Component({
  selector: 'app-monitor-detail',
  templateUrl: './monitor-details.page.html',
  styleUrls: ['./monitor-details.page.scss'],
  animations: [
    Animations.slideUpDownTrigger
  ]
})
export class MonitorDetailsPage implements OnInit {
  id: string;
  private dynamicFormSubmit: Subject<void> = new Subject<void>();
  private dynamicFormValid: Subject<boolean> = new Subject<boolean>();
  @ViewChild(DynamicFormComponent) subForm: DynamicFormComponent;
  monitorUpdateLoad: boolean;
  @ViewChild('monitorPopup') monitorPopPencil: ElementRef;
  @ViewChild('updateMonPen') updateMonNamePencil:ElementRef;
  @ViewChild('pencilAddSettings') updateSettingPencil: ElementRef;
  monitor$: Observable<Monitor>;
  Object = window.Object;
  additionalSettings: string = 'out';
  gc = new Subscription();

  @ViewChild('delMonLink') delMonitor: ElementRef;
  @ViewChild('delMonitorFail') delMonitorFailure: ElementRef;
  deleteLoading: boolean = false;
  isUpdtPnlActive = false;
  updateMonNameLoading: boolean = false;
  updateAdditionalLoading:boolean = false;

  dynaConfig: FieldConfig[];
  monDetails: Monitor;

  additionalSettingEdit = false;
  updateMonNameForm: FormGroup;
  udpateSettingForm: FormGroup;
  formatProp=[];

  updateBody = [];

  @ViewChild(AdditionalSettingsComponent) additionalSettingsForm: AdditionalSettingsComponent;
  constructor(private route: ActivatedRoute, private router: Router,private readonly schemaService: SchemaService,
    private fb: FormBuilder, private monitorService: MonitorService, private spnService: SpinnerService,
    private pipeSeconds: DurationSecondsPipe, private resourceService: ResourcesService) {
      this.spnService.changeLoadingStatus(true);
  }

  ngOnInit() {
    // popover form for updating Monitor name
    this.updateMonNameForm = this.fb.group({
      name: ['']
    });

    this.udpateSettingForm = this.fb.group({
      interval: [''],
      excludedResourceIds: this.fb.array([this.fb.group({
        resource: new FormControl('')})]),
      labelSelectorMethod: [''],
      resourceId: ['']
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.monitor$ = this.monitorService.getMonitor(this.id).pipe(
        tap((data) => {
          this.monDetails = data;
          this.spnService.changeLoadingStatus(false);
          this.updateMonNameForm.controls['name'].setValue(this.monDetails.name || {});
        })
      );
    });
    this.gc.add(
      this.dynamicFormValid.subscribe((valid) => {
        if (valid) {
          this.monitorUpdate(this.pluginProps(this.subForm.form), UpdateSection.plugin);
        }else{
          this.monitorUpdateLoad=false;
          throw "Form is not valid!";
        }
      })
    );
  }

  /**
   * Delete a monitor
   * @param id string
   */
  deleteMonitor(id: string): void {
    this.deleteLoading = true;
    this.monitorService.deleteMonitor(id).subscribe((resp) => {
      this.deleteLoading = false;

      if (resp.status === 204) {
        this.router.navigate(['/monitors']);
      }
      else {
        this.delMonitor.nativeElement.click();
        this.delMonitorFailure.nativeElement.click();
      }
    }, () => {
      this.deleteLoading = false;
      this.delMonitor.nativeElement.click();
      this.delMonitorFailure.nativeElement.click();
    });
  }

  /**
   * Update Monitors plugin details
   * @param updateBody any
   * @param updateSection string - section of the monitor being updated
   */
  monitorUpdate(updateBody:any, updateSection: string) {
    this.monitorService.updateMonitor(this.id, updateBody).subscribe(data =>{
      this.monitor$ = of<Monitor>(this.monitorService.monitor).pipe(
        tap((data) => {
          this.monDetails = data;
        })
      );
      switch(updateSection) {
        case UpdateSection.plugin:
          this.monitorUpdateLoad=false;
          this.isUpdtPnlActive=false;
          break;
        case UpdateSection.name:
          this.updateMonNameLoading = false;
          this.updateMonNamePencil.nativeElement.click();
          break;
        case UpdateSection.additional:
          this.additionalSettingEdit = false;
          break;
      }
    });
  }

  /**
   * Create patch objects to update monitor plugin
   * IF it plugin value is belong to datetime "format" then convet into seconds and match with form value
   * else match defualt value form value
   */
  pluginProps(form) {
    let patchBody = [];
    Object.keys(form.value).forEach(item => {
      if (this.formatProp.filter(a => a === item).length > 0) {
        let second = this.pipeSeconds.transform(this.monDetails.details.plugin[item]);
        if (second !== form.value[item]) {
          patchBody.push({ op: "replace", path: `/details/plugin/${item}`, "value": form.value[item] });
        }
      } else if (this.monDetails.details.plugin[item] !== form.value[item]) {
        patchBody.push({ op: "replace", path: `/details/plugin/${item}`, "value": form.value[item] });
      }
    });
    return patchBody;
  }

  pencilClick() {
    this.creatDynamicConfig();
    this.isUpdtPnlActive = true;
  }

  /**
   * Update Monitor name function
   * @param monitorName FormGroup
   */
  updateMonitorName(monitorName: FormGroup) {
    this.updateMonNameLoading = true;
    let patchBody = [{op: "replace", path: `/name`, value: monitorName.value.name }];
    this.monitorUpdate(patchBody, UpdateSection.name);
  }

  /**
   * Update Monitor additional settings
   * @param settingsForm FormGroup
   */
  updateMonitorSettings() {
    this.updateBody = [];
    let addForm = Object.assign({}, this.additionalSettingsForm.value);
    Object.keys(addForm).map((value) => {
      if (value === 'interval' || value === 'excludedResourceIds') {
        this.updateBody.push({ op: "replace", path: `/${value}`, value: addForm[value]});
      }
      else if (value === 'resourceId') {
        this.updateBody.push({ op: "replace", path: `/${value}`, value: `${addForm[value]}`});
        this.updateBody.push({ op: "replace", path: '/labelSelector', value: null});
        this.updateBody.push({ op: "replace", path: '/excludedResourceIds', value: []});
      }
      else {
        this.updateBody.push({ op: "replace", path: `/${value}`, value: `${addForm[value]}`});
      }
    });

    this.monitorUpdate(this.updateBody, UpdateSection.additional);
  }

  modifySettings() {
    this.additionalSettings = 'in';
    this.additionalSettingEdit = true;
  }

  /**
   * Get monitor type and creat and dynamic form as per Moniotor type
   * @param monitor
   */
  creatDynamicConfig() {
    let keys=Object.keys(this.schemaService.schema.definitions);
    for (let index = 0; index < keys.length; index++) {
      const element = this.schemaService.schema.definitions[keys[index]];
      if (element.title === this.monDetails.details.plugin.type) {
        let definitions = this.setDefaultValue(element)
        this.dynaConfig = MonotorUtil.CreateMonitorConfig(definitions);
        return;
      }

    }
  }

  /**
   * Set Default value for dynamic form
   * @param definitions
   */
  setDefaultValue(definitions) {    Object.keys(definitions.properties).forEach(prop => {
      if (definitions.properties[prop].hasOwnProperty(CntrlAttribute.format)) {
        if (this.monDetails.details.plugin[prop]) {
          this.formatProp.push(prop);
          definitions.properties[prop].default = this.pipeSeconds.transform(this.monDetails.details.plugin[prop]);
        }
      } else {
        definitions.properties[prop].default = this.monDetails.details.plugin[prop];
      }
    }
    )
    return definitions;
  }

  ngOnDestroy() {
    this.gc.unsubscribe();
  }

}
