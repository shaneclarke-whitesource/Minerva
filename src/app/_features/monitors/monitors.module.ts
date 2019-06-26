import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../_shared/shared.module';
import { MonitorService } from '../../_services/monitors/monitor.service';
import { MonitorslistComponent } from './components/list/monitorslist.component';
import { MonitorsPage } from './pages/monitors/monitors.page';
import { MonitorDetailsPage } from './pages/details/monitor-details.page';

const routes: Routes = [
  {
      path: '',
      component: MonitorsPage,
      data: {
        breadcrumb: ''
      }
  },
  {
    path: ':id',
    component: MonitorDetailsPage,
    data: {
      breadcrumb: 'DETAILS'
    }
}
];

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    MonitorsPage,
    MonitorslistComponent,
    MonitorDetailsPage
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MonitorService
  ]
})
export class MonitorsModule { }
