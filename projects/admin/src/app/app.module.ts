import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const providers = []

@NgModule({
  declarations: [
    AppComponent,
    AdminviewComponent,
    NavComponent
  ],
  imports: [       
    AppRoutingModule
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class AdminAppModule{
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers:providers
    }
  }
}
