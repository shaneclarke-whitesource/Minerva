import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResourcesService } from '../../../../_services/resources/resources.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs'

@Component({
  selector: 'app-resourceslist',
  templateUrl: './resourceslist.component.html',
  styleUrls: ['./resourceslist.component.less']
})
export class ResourcesListComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  searchPlaceholderText: string;
  resources: any = [];
  total: number;
  page: number;

  selectedResources: any = [];
  constructor(private resourceService: ResourcesService) { }

  ngOnInit() {
    this.resourceService.getResources()
    .pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(data => {
      this.resources = this.resourceService.resources.default.content;
      this.total = this.resourceService.resources.default.totalElements;
      this.page = this.resourceService.resources.default.number;
      this.searchPlaceholderText = `Search ${this.total} Resources`;
    });
  }

  checkColumn(event) {
    if (event.target.checked) {
      this.selectedResources = this.resources.map(x => Object.assign({}, x));
    }
    else {
      this.selectedResources = [];
    }
    this.resources.forEach(e => {
        e.checked = event.target.checked;
    });
  }

  selectResource(resource) {
    if (this.selectedResources.indexOf(resource) === -1) {
      this.selectedResources.push(resource);
    } else {
      this.selectedResources.splice(
        this.selectedResources.indexOf(resource), 1
      );
    }
  }

  ngOnDestroy() {
    //unsubcribe once component is done
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
