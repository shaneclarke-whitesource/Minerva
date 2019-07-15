import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../_shared/shared.module';
import { GraphsComponent } from './components/graphs/graphs.component';
import { VisualizePage } from './pages/visualize.page/visualize.page.component';
import { VisualizeService } from '../../_services/visualize/visualize.service';

const routes: Routes = [
  {
      path: '',
      component: VisualizePage,
      data: {
        breadcrumb: ''
      }
  }
];

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [GraphsComponent, VisualizePage],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    VisualizeService
  ]
})
export class VisualizeModule { }
