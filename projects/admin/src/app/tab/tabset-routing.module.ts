import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from '../auth/auth-gaurd.service';
import { TabsetComponent } from './tabset.component';

const routes: Routes = [
  { path: '', 
component: TabsetComponent,
canActivate:[AuthGuard]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabRoutingModule { }
