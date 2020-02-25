import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../_shared/shared.module';
import { LabelService } from '../../_services/labels/label.service';
import { MonitorService } from '../../_services/monitors/monitor.service';
import { MonitorslistComponent } from './components/list/monitorslist.component';
import { MonitorsPage } from './pages/monitors/monitors.page';
import { MonitorDetailsPage } from './pages/details/monitor-details.page';
import { MonitorCreatePage } from './pages/create/monitor-create.page';

const routes: Routes = [
  {
      path: '',
      component: MonitorsPage,
      data: {
        breadcrumb: ''
      }
  },
  {
    path: 'details/:id',
    component: MonitorDetailsPage,
    data: {
      breadcrumb: 'DETAILS'
    }
  },
  {
    path: 'create',
    component: MonitorCreatePage,
    pathMatch: 'full',
    data: {
      breadcrumb: 'ADD'
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
    MonitorDetailsPage,
    MonitorCreatePage
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MonitorService,
    LabelService
  ]
})
export class MonitorsModule { }
