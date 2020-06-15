import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabRoutingModule } from './tabset-routing.module';
import { TabsetComponent } from './tabset.component';


@NgModule({
  declarations: [TabsetComponent],
  imports: [
    CommonModule,
    TabRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsetModule { }
