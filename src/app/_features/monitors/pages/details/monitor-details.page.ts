import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animations } from 'src/app/_shared/animations';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { MonitorService } from 'src/app/_services/monitors/monitor.service';
import { Monitor } from 'src/app/_models/monitors';
import { SchemaService } from 'src/app/_services/monitors/schema.service';
import { MonotorUtil, CntrlAttribute } from '../../mon.utils';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { tap } from 'rxjs/operators';
import { duration} from "moment";
import { FieldConfig } from '../../interfaces/field.interface';
import { SpinnerService } from 'src/app/_services/spinner/spinner.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  monitor$: Observable<Monitor>;
  Object = window.Object;
  additionalSettings: string = 'out';
  gc = new Subscription();

  @ViewChild('delMonLink') delMonitor: ElementRef;
  @ViewChild('delMonitorFail') delMonitorFailure: ElementRef;
  deleteLoading: boolean = false;
  isUpdtPnlActive = false;
  updateMonNameLoading: boolean = false;

  dynaConfig: FieldConfig[];
  monDetails: Monitor;
  updateMonNameForm: FormGroup;
  formatProp=[];


  constructor(private route: ActivatedRoute, private router: Router,private readonly schemaService: SchemaService, private fb: FormBuilder, private monitorService: MonitorService, private spnService: SpinnerService) {
      this.spnService.changeLoadingStatus(true);
     }
  
  ngOnInit() {
    // popover form for updating Monitor name
    this.updateMonNameForm = this.fb.group({
      name: ['']
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
        case 'plugin':
          this.monitorUpdateLoad=false;
          this.isUpdtPnlActive=false;
          break;
        case 'name':
          this.updateMonNameLoading = false;
          this.updateMonNamePencil.nativeElement.click();
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
        let second = this.cnvrtDurtnToSec(this.monDetails.details.plugin[item]);
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
          definitions.properties[prop].default = this.cnvrtDurtnToSec(this.monDetails.details.plugin[prop]);
        }
      } else {
        definitions.properties[prop].default = this.monDetails.details.plugin[prop];
      }
    }
    )
    return definitions;
  }
  cnvrtDurtnToSec(dura){
    let second: any = duration(dura, 'second');
    return second/1000;
  }
  ngOnDestroy() {
    this.gc.unsubscribe();
  }

}
