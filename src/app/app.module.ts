import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { localStorageProviders } from '@ngx-pwa/local-storage';
import { environment } from 'src/environments/environment';

import { PocDataCallComponent } from './poc-data-call/poc-data-call.component';
import { AppModuleMock } from './app.module.mock';

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
    localStorageProviders({ prefix: 'intelligence' }),
    {
      provide: APP_INITIALIZER,
      useFactory: portalData,
      multi: true,
      deps: []
    }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}

export function portalData(): any {
  if (!environment.production) {
    Window['PORTAL_DATA'] = new AppModuleMock().mock
  }
  return () => {};
}
