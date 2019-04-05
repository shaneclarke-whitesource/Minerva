import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesService } from '../../_services/resources/resources.service';
import { ResourcesComponent } from './components/resources.component';

const routes: Routes = [
  {
      path: '',
      component: ResourcesComponent
  }
];

@NgModule({
  declarations: [ResourcesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ResourcesService
  ]
})
export class ResourcesModule { }
