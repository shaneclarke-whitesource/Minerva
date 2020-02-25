import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import  { transformKeyPairs } from '../../../../_shared/utils';
import { MonitorService } from 'src/app/_services/monitors/monitor.service.js';
import { LabelService } from '../../../../_services/labels/label.service';
import { Observable, Subject, Subscription } from 'rxjs';

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


  constructor(private monitorService: MonitorService, private fb: FormBuilder,
    private labelService: LabelService) { }

    ngOnInit() {
      let typesOfMonitors = this.monitorService.getSchema().subscribe(data => {
        this.typesOfMonitors = Object.keys(this.monitorService.schema.definitions);
      });

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
          console.log("submitted");
        }
      });

      this.subManager.add(typesOfMonitors);
      this.subManager.add(labelFormSubscrip);
      this.subManager.add(labelServiceSub);
  }


/**
 * @description Create a Monitor
 * @param monitorForm FormGroup
 */
  async addMonitor(monitorForm: FormGroup) {

    let formValid = this.createMonitorForm.valid;

    let submit = this.labelSubmit.next();

    let isValid = await this.labelFormSubmit.toPromise();

  }


    /**
   * @description Whenever updates are made to the form we retrieve values here
   * @param metaValues {[key: string] : any}
   */
  labelsUpdated(metaValues: {[key: string] : any}):void {
    this.updatedLabelFields = transformKeyPairs(metaValues.keysandvalues);
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }


}
