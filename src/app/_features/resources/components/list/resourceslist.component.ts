import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../../environments/environment';
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
  page: number = 1;
  defaultAmount: number = environment.pagination.pageSize;
  totalPages: number;
  fetchResources: any;

  selectedResources: any = [];
  constructor(private resourceService: ResourcesService) { }

  ngOnInit() {
    this.fetchResources = () => {
      return this.resourceService.getResources(this.defaultAmount, this.page)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe(data => {
          this.resources = this.resourceService.resources.default.content;
          this.total = this.resourceService.resources.default.totalElements;
          // reapply once API logic is confirmed
          //this.page = this.resourceService.resources.default.number + 1;
          this.searchPlaceholderText = `Search ${this.total} Resources`;
        });
    }

    this.fetchResources();
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

  goToPage(n: number): void {
    this.page = n;
    this.fetchResources();
  }

  nextPage(): void {
    this.page++;
    this.fetchResources();
  }

  prevPage(): void {
    this.page--;
    this.fetchResources();
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
