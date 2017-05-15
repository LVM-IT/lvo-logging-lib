import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { LogviewAppModule } from './app/logview.module';



if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(LogviewAppModule);
