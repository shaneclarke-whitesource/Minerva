import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from '../app/auth/auth-gaurd.service';
import { SchemaResolver } from 'src/app/_features/monitors/monitor.resolve';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./tab/tabset.module').then(m => m.TabsetModule),
    data:{
      breadcrumb: null
    },resolve: {schema: SchemaResolver },
    canActivate:[AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
