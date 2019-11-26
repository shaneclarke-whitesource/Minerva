import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as HelixUI from "helix-ui";

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

HelixUI.default.initialize();
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
