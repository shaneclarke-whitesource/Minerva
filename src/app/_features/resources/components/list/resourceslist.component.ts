import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ResourcesService } from '../../../../_services/resources/resources.service';
import { ValidateResource } from '../../../../_shared/validators/resourceName.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs'
import { Resource, CreateResource } from 'src/app/_models/resources';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resourceslist',
  templateUrl: './resourceslist.component.html',
  styleUrls: ['./resourceslist.component.scss']
})
export class ResourcesListComponent implements OnInit, OnDestroy {

  @ViewChild('addResButton') addButton:ElementRef;

  private ngUnsubscribe = new Subject();
  searchPlaceholderText: string;
  resources: Resource[];
  total: number;
  page: number = 0;
  defaultAmount: number = environment.pagination.pageSize;
  totalPages: number;
  fetchResources: any;
  addResLoading: boolean = false;
  selectedResources: any = [];
  addResourceForm: FormGroup;
  constructor(private resourceService: ResourcesService,
    private validateResource: ValidateResource, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.fetchResources = () => {
      return this.resourceService.getResources(this.defaultAmount, this.page)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe(data => {
          this.resources = this.resourceService.resources.content;
          this.total = this.resourceService.resources.totalElements;
          this.searchPlaceholderText = `Search ${this.total} Resources`;
        });
    }

    this.fetchResources();

    // popover form for adding a Resource
    this.addResourceForm = this.fb.group({
      name: ['', Validators.required],
      enabled: ['']
    });
  }

  /**
   * @description check column event for items in tables, selects resource item
   * @param event any
   * @returns void
   */
  checkColumn(event):void {
    if (event.target.checked) {
      this.selectedResources = this.resources.map(x => Object.assign({}, x));
    }
    else {
      this.selectedResources = [];
    }
    this.resources.forEach(e => {
      e["checked"] = event.target.checked;
    });
  }

  /**
   * @description <app-pagination>
   * @param n number
   * @returns void
  */
  goToPage(n: number): void {
    this.page = n;
    this.fetchResources();
  }

  /**
   * @description <app-pagination>
   */
  nextPage(): void {
    this.page++;
    this.fetchResources();
  }

  /**
   * @description <app-pagination>
   */
  prevPage(): void {
    this.page--;
    this.fetchResources();
  }

  /**
   * @description Add selected resources to an array for actions
   * @param resource Resource
   */
  selectResource(resource:Resource):void {
    if (this.selectedResources.indexOf(resource) === -1) {
      this.selectedResources.push(resource);
    } else {
      this.selectedResources.splice(
        this.selectedResources.indexOf(resource), 1
      );
    }
  }

/**
 * @description Adds a resource after validating resource id
 * @param resourceForm FormGroup
 * @returns void
*/
  addResource(resourceForm: FormGroup):void {
    if (resourceForm.controls['name'].value) {
      this.addResLoading = true;
      // check if the resourceId can be be used & is valid
      this.validateResource.valid(resourceForm.controls['name'].value)
        .subscribe((response) => {
        this.addResLoading = false;
          // if status of request is 200 the resourceId is taken and cannot be used
          if (response.status === 200) {
            resourceForm.controls['name'].setErrors({ 'invalidResourceName': true });
          }
        }, error => {
          // if status of request is 404 the resourceId was not found and can be used
          if ((error.status === 404)) {
            let resource: CreateResource = {
              resourceId: resourceForm.controls['name'].value,
              presenceMonitoringEnabled: resourceForm.controls['enabled'].value ? true : false
            }
            // once valid, create the initial resource
            this.resourceService.createResource(resource).subscribe((result) => {
              this.addResLoading = false;
              this.router.navigate(['/resources', result.resourceId]);
            })
          }
        })
    }
  }

  ngOnDestroy() {
    //unsubcribe once component is done
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
