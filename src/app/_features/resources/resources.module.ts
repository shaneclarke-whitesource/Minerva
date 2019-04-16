import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesService } from '../../_services/resources/resources.service';
import { ResourcesListComponent } from './components/list/resourceslist.component';
import { ResourcesPage } from './pages/resources/resources.page'

const routes: Routes = [
  {
      path: '',
      component: ResourcesPage
  }
];

@NgModule({
  declarations: [
    ResourcesListComponent,
    ResourcesPage
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
