import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { localStorageProviders } from '@ngx-pwa/local-storage';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

import { LoggingService } from './_services/logging/logging.service';
import { PortalDataService } from './_services/portal/portal-data.service';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent
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
    },
    {
      provide: APP_INITIALIZER,
      useFactory: logger,
      multi: true,
      deps: []
    }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}

export function portalData(): any {
  new PortalDataService();
  return () => {};
}

export function logger(): any {
  var logger = new LoggingService();
  // if we don't currently have a log level set
  // set the level to a default of error
  if (!logger.getLevel()){
    logger.setLevel(logger.logLevels.error);
  }
  return () => {};
}
