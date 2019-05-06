import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesService } from '../../_services/resources/resources.service';
import { ResourcesListComponent } from './components/list/resourceslist.component';
import { ResourcesPage } from './pages/resources/resources.page';
import { ResourceDetailsPage } from './pages/details/resource-details.page';
import { SharedModule } from '../../_shared/shared.module';
const routes: Routes = [
  {
      path: '',
      component: ResourcesPage
  },
  {
      path: ':id',
      component: ResourceDetailsPage
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
    ResourcesService
  ]
})
export class ResourcesModule { }
