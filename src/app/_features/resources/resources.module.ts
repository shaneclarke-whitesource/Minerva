import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesService } from '../../_services/resources/resources.service';
import { ResourcesListComponent } from './components/list/resourceslist.component';
import { ResourcesPage } from './pages/resources/resources.page';
import { ResourceDetailsPage } from './pages/details/resource-details.page'

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
  declarations: [
    ResourcesListComponent,
    ResourcesPage,
    ResourceDetailsPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ResourcesService
  ]
})
export class ResourcesModule { }
