import { NgModule, ModuleWithProviders, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GlobalErrorHandler } from './global-error.handler';
import {ServerErrorInterceptor } from '../_interceptors/server-error.interceptor';
import { BreadcrumbComponent } from './_components/breadcrumb/breadcrumb.component';
import { PaginationComponent } from './_components/pagination/pagination.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [BreadcrumbComponent, PaginationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BreadcrumbComponent,
    PaginationComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
