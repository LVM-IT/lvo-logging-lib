import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { LoggingModule } from './index';
import { LogviewComponent } from './logview.component';
import * as Raven from 'raven-js';
import { FormsModule } from '@angular/forms';

Raven
    .config('https://78de191c783e4309b83fba3f8abcde5b@sentry.io/182689')
    .install();

export class RavenErrorHandler implements ErrorHandler {
    handleError(err: any): void {
        Raven.captureException(err.originalError);
    }
}

@NgModule({
    declarations: [
        LogviewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        LoggingModule
    ],
    providers: [{provide: ErrorHandler, useClass: RavenErrorHandler}],
    bootstrap: [LogviewComponent]
})
/**
 * View Module for demonstration purposes only
 */
export class LogviewAppModule {
}
