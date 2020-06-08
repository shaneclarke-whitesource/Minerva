import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, animate, style, group, state } from '@angular/animations'
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorService } from '../../../../_services/monitors/monitor.service';
import { Observable, Subject } from 'rxjs';
import { Monitor } from 'src/app/_models/monitors';
import { SchemaService } from 'src/app/_services/monitors/schema.service';
import { MonotorUtil } from '../../mon.utils';
import { FormGroup } from '@angular/forms';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { tap } from 'rxjs/operators';


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
  monitorUpdateLoad:boolean;
  updateMonitorForm: FormGroup;
  @ViewChild('monitorPopup') monitorPopPencil:ElementRef; 

  monitor$: Observable<Monitor>;
  Object = window.Object;
  additionalSettings: string = 'out';
  test: any;

  @ViewChild('delMonLink') delMonitor: ElementRef;
  @ViewChild('delMonitorFail') delMonitorFailure: ElementRef;
  deleteLoading: boolean = false;
  activeUpdatepanel=false;
  // isLoaded=false;
  dynaConfig: import("/home/prashant/Rackspace Repo/Minerva/src/app/_features/monitors/interfaces/field.interface").FieldConfig[];
  monitoryType: string;


  constructor(private route: ActivatedRoute, private router: Router,
    private readonly schemaService: SchemaService,
    private monitorService: MonitorService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.monitor$=this.monitorService.getMonitor(this.id).pipe(
        tap( data => {
          this.monitoryType = data.details.plugin.type;
          // this.isLoaded=true;
        })
      );      
    });    
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

  monitorUpdated(event) {
  }

  pencilClick(){
    this.monitorDetailsubForm();
    this.activeUpdatepanel=true;
  }

 /**
  * get monitor type and creat and dynamic form as per Moniotor type 
  * @param monitor 
  */
  monitorDetailsubForm() {
    Object.keys(this.schemaService.schema.definitions).forEach(prop => {
      if (this.schemaService.schema.definitions[prop].title === this.monitoryType) {
        let definitions = this.schemaService.schema.definitions[prop];
        this.dynaConfig = MonotorUtil.CreateMonitorConfig(definitions);
      }
    })
  }
}
