import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoggingModule } from './index';
import { LogviewComponent } from './logview.component';

@NgModule({
    declarations: [
        LogviewComponent
    ],
    imports: [
        BrowserModule,
        LoggingModule
    ],
    providers: [
    ],
    bootstrap: [LogviewComponent]
})
/**
 * View Module for demonstration purposes only
 */
export class LogviewAppModule {
}
