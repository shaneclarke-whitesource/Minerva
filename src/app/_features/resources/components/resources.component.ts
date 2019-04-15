import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../../../_services/resources/resources.service';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.less']
})
export class ResourcesComponent implements OnInit {

  resources: any = [];
  constructor(private resourceService: ResourcesService) {

  }

  ngOnInit() {
    this.resourceService.getResources().subscribe(data => {
      this.resources = this.resourceService.resources;
    });
  }

}
