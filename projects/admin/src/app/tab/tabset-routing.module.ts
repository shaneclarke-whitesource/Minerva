import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from '../auth/auth-gaurd.service';
import { TabsetComponent } from './tabset.component';
import { AdminResourceDetailsPage } from './../../app/_features/resources/pages/details/admin-resource-details.page';

const routes: Routes = [
  {
    path: '', 
    component: TabsetComponent,
    canActivate:[AuthGuard]
 },
 {
  path: 'resources/:id', 
  component: AdminResourceDetailsPage,
}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabRoutingModule { }
