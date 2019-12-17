import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../_shared/shared.module';
import { ResourcesService } from '../../_services/resources/resources.service';
import { ResourcesListComponent } from './components/list/resourceslist.component';
import { ResourcesPage } from './pages/resources/resources.page';
import { ResourceDetailsPage } from './pages/details/resource-details.page';
import { ValidateResource } from 'src/app/_shared/validators/resourceName.validator';

const routes: Routes = [
  {
      path: '',
      component: ResourcesPage,
      data: {
        breadcrumb: ''
      }
  },
  {
      path: ':id',
      component: ResourceDetailsPage,
      data: {
        breadcrumb: 'DETAILS'
      }
  }
];

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    ResourcesListComponent,
    ResourcesPage,
    ResourceDetailsPage
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ResourcesService,
    ValidateResource
  ]
})
export class ResourcesModule { }
