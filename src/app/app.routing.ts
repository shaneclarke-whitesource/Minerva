import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'resources', loadChildren: './_features/resources/resources.module#ResourcesModule',
    data: {
      breadcrumb: 'RESOURCES'
    }
  },
  { path: '', redirectTo: '/resources', pathMatch: 'full'},
  { path: '**', redirectTo: '/resources'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
