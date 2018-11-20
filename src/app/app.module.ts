import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { localStorageProviders } from '@ngx-pwa/local-storage';

import { PocDataCallComponent } from './poc-data-call/poc-data-call.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    PocDataCallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [],
  providers: [
    localStorageProviders({ prefix: 'intelligence' })
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
