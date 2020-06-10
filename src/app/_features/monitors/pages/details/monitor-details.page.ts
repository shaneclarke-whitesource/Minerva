import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, animate, style, group, state } from '@angular/animations'
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorService } from '../../../../_services/monitors/monitor.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Monitor } from 'src/app/_models/monitors';
import { SchemaService } from 'src/app/_services/monitors/schema.service';
import { MonotorUtil, CntrlAttribute } from '../../mon.utils';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { tap } from 'rxjs/operators';
import { duration} from "moment";
import { FieldConfig } from '../../interfaces/field.interface';

declare const window: any;

@Component({
  selector: 'app-monitor-detail',
  templateUrl: './monitor-details.page.html',
  styleUrls: ['./monitor-details.page.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        'opacity': '1', 'visibility': 'visible'
      })),
      state('out', style({
        'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
      })),
      transition('in => out', [group([
        animate('400ms ease-in-out', style({
          'opacity': '0'
        })),
        animate('500ms ease-in-out', style({
          'max-height': '0px'
        })),
        animate('900ms ease-in-out', style({
          'visibility': 'hidden'
        }))
      ]
      )]),
      transition('out => in', [group([
        animate('1ms ease-in-out', style({
          'visibility': 'visible'
        })),
        animate('600ms ease-in-out', style({
          'max-height': '500px'
        })),
        animate('800ms ease-in-out', style({
          'opacity': '1'
        }))
      ]
      )])
    ])
  ]
})
export class MonitorDetailsPage implements OnInit {
  id: string;
  private dynamicFormSubmit: Subject<void> = new Subject<void>();
  private dynamicFormValid: Subject<boolean> = new Subject<boolean>();
  @ViewChild(DynamicFormComponent) subForm: DynamicFormComponent;
  monitorUpdateLoad: boolean;
  @ViewChild('monitorPopup') monitorPopPencil: ElementRef;

  monitor$: Observable<Monitor>;
  Object = window.Object;
  additionalSettings: string = 'out';
  gc = new Subscription();

  @ViewChild('delMonLink') delMonitor: ElementRef;
  @ViewChild('delMonitorFail') delMonitorFailure: ElementRef;
  deleteLoading: boolean = false;
  isUpdtPnlActive = false;
  // isLoaded=false;
  dynaConfig: FieldConfig[];
  monDetails: Monitor;
  formatProp=[];


  constructor(private route: ActivatedRoute, private router: Router,
    private readonly schemaService: SchemaService,
    private monitorService: MonitorService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.monitor$ = this.monitorService.getMonitor(this.id).pipe(
        tap((data) => {
          this.monDetails = data;          
        })
      );
    });
    this.gc.add(
      this.dynamicFormValid.subscribe((valid) => {
        if (valid) {
          this.monitorUpdate();
        }else{
          this.monitorUpdateLoad=false;
          throw "Form is not valid!";
        }
      })
    )
  }

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
   */
  monitorUpdate() {
    let updateBody=this.pluginProps(this.subForm.form);
    this.monitorService.updateMonitorTypeDetails(this.id,updateBody).subscribe(data =>{
      this.monDetails = data;
      this.monitorUpdateLoad=false;
      this.isUpdtPnlActive=false;
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
  setDefaultValue(definitions) {
    Object.keys(definitions.properties).forEach(prop => {
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
