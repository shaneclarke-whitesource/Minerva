import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { BreadCrumb } from '../../../_models/breadcrumb';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs : BreadCrumb[];
  @Input() routeDetails: string = "";
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '',
                  breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    // If no routeConfig or breadcrumb avalailable we are on the root path
    // lets skip and get the relevant routes
    if (!route.routeConfig && route.firstChild) {
      return this.buildBreadCrumb(route.firstChild);
    }

    // now we get the breadcrumb data associated with the route
    const label = route.routeConfig.data['breadcrumb'];
    const path = route.routeConfig.path;

    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = `/${url}${path}/`;
    const breadcrumb = {
      label: label,
      url: nextUrl,
    };

    const newBreadcrumbs = [...breadcrumbs, breadcrumb];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    // once arriving at the last crumb we want the ability to change the label
    // dynamically to the title of the details
    breadcrumb.label = this.routeDetails ? this.routeDetails: label;
    return newBreadcrumbs;
  }
}
