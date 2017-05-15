import { Component, OnInit } from '@angular/core';
import { LogManager } from './logging/log-manager.service';
import { Logger } from './logging/logger.service';

@Component({
    selector: 'app-root',
    template: `<h1>
                {{title}}
               </h1>
               Please check your Browsers Console for logging messages !`
})
export class LogviewComponent implements OnInit {


    title = 'Logger Configuration Page';

    private log: Logger;

    constructor(private logManager: LogManager) {
        this.log = logManager.getLogger(this, '#4863A0');
    }

    ngOnInit(): void {
        this.log.info('[ngOnInit]', 'Logview Component initialized !', this);
        this.logIt();
    }

    logIt(): boolean {
        return this.log.info('logged');
    }

}
