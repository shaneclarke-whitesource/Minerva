import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabRoutingModule } from './tabset-routing.module';
import { TabsetComponent } from './tabset.component';
import { MonitorsModule } from 'src/app/_features/monitors/monitors.module';
import { ResourcesModule } from 'src/app/_features/resources/resources.module';


@NgModule({
  declarations: [TabsetComponent],
  imports: [
    CommonModule,
    TabRoutingModule,
    MonitorsModule,
    ResourcesModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsetModule { }
