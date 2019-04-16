import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../../../../_services/resources/resources.service';


@Component({
  selector: 'app-resourceslist',
  templateUrl: './resourceslist.component.html',
  styleUrls: ['./resourceslist.component.less']
})
export class ResourcesListComponent implements OnInit {

  resources: any = [];
  constructor(private resourceService: ResourcesService) {

  }

  ngOnInit() {
    this.resourceService.getResources().subscribe(data => {
      this.resources = this.resourceService.resources;
    });
  }

}
