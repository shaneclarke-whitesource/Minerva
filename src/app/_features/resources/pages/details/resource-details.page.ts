import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourcesService } from '../../../../_services/resources/resources.service';
import { Observable } from 'rxjs';
import { Resource } from 'src/app/_models/resources';

declare const window: any;
@Component({
  selector: 'app-resource-details.page',
  templateUrl: './resource-details.page.html',
  styleUrls: ['./resource-details.page.scss']
})
export class ResourceDetailsPage implements OnInit {
  id: string;
  meta: {};
  //TODO: create Interface for a single Resource - will be mapped to
  // service & response
  resource$: Observable<Resource>;
  Object = window.Object;

  constructor(private route: ActivatedRoute, private resourceService: ResourcesService) { }

  // TODO: attempt to move this logic to a route resolve as opposed
  // to making the request within the component
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.resource$ = this.resourceService.getResource(this.id);
    });
  }

}
