import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from '../app/auth/auth-gaurd.service';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./tab/tabset.module').then(m => m.TabsetModule),
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
