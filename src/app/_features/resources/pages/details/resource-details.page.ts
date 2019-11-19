import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourcesService } from '../../../../_services/resources/resources.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Resource } from 'src/app/_models/resources';
import { tap } from 'rxjs/operators';

declare const window: any;
@Component({
  selector: 'app-resource-details.page',
  templateUrl: './resource-details.page.html',
  styleUrls: ['./resource-details.page.scss']
})
export class ResourceDetailsPage implements OnInit {

  @ViewChild('metapop') metaPopPencil:ElementRef;
  @ViewChild('labelpop') labelPopPencil:ElementRef;
  id: string;

  resource$: Observable<Resource>;
  private metaSubmit: Subject<void> = new Subject<void>();
  private labelsSubmit: Subject<void> = new Subject<void>();
  private metaFormSubmit: Subject<boolean> = new Subject<boolean>();
  private labelFormSubmit: Subject<boolean> = new Subject<boolean>();
  subManager = new Subscription();

  Object = window.Object;
  metaLoading:boolean = false;
  labelsLoading:boolean = false;
  updatedMetaFields: {[key: string] : any};
  updatedLabelFields: any;

  constructor(private route: ActivatedRoute, private resourceService: ResourcesService) { }

  // TODO(optional): attempt to move this logic to a route resolve as opposed
  // to connecting the subscription to the request within the component
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.resource$ = this.resourceService.getResource(this.id);
    });

    let metaFormSubscrip = this.metaFormSubmit.subscribe((valid) => {
      if (!valid) {
        this.metaLoading = false;
      }
      else {
        this.finalizeMeta();
      }
    });

    let labelFormSubscrip = this.labelFormSubmit.subscribe((valid) => {
      if (!valid) {
        this.labelsLoading = false;
      }
      else {
        this.finalizeLabels();
      }
    });

    this.subManager.add(metaFormSubscrip);
    this.subManager.add(labelFormSubscrip);
  }

  /**
   * @description Whenever updates are made to the form we retrieve values here
   * @param metaValues {[key: string] : any}
   */
  metaValueUpdated(metaValues: {[key: string] : any}):void {
    this.updatedMetaFields = this.transformKeyPairs(metaValues.keysandvalues);
  }

  /**
   * @description When fields are valid we then make the request to the server
   * and tie it the subscription of the resource$ being used in the template
   */
  finalizeMeta() {
    this.updatedMetaFields = { 'metadata': this.updatedMetaFields};
    this.resource$ = this.resourceService.updateResource(this.resourceService.resource.resourceId,
      this.updatedMetaFields).pipe(
        tap(x => {
          this.metaLoading = false
        })
      )
  }
  /**
   * @description Whenever updates are made to the form we retrieve values here
   * @param labelValues {[key: string] : any}
   */
  labelsUpdated(labelValues: {[key: string] : any}): void {
    this.updatedLabelFields = this.transformKeyPairs(labelValues.keysandvalues);
  }

  /**
   * @description When fields are valid we then make the request to the server
   */
  finalizeLabels() {
    this.updatedLabelFields = { 'labels': this.updatedLabelFields};
    this.resource$ = this.resourceService.updateResource(this.resourceService.resource.resourceId,
      this.updatedLabelFields).pipe(
        tap(x => {
          this.labelsLoading = false
        })
      );
  }

  /**
   * @description Turns the array of key pairs into an object
   * @param keyPairs [{[key: string] : any}]
   * @returns {}
   */
  private transformKeyPairs(keyPairs: [{[key: string] : any}]): {} {
    let paired = {};
    keyPairs.forEach(element => {
      if (element.key && element.value) {
        paired[element.key] = element.value;
      }
    });
    return paired;
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
}
