import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoggingModule } from '@lvo/logging';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        LoggingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
