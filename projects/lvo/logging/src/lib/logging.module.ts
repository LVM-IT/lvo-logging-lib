import { NgModule } from '@angular/core';
import { LogManager } from './log-manager.service';
import { Logger } from './logger.service';


@NgModule({
    declarations: [],
    imports: [],
    providers: [
        Logger, LogManager
    ],

    exports: []

})
export class LoggingModule {

}
