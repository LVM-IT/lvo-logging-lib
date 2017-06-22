import { Component, OnInit } from '@angular/core';
import { LogManager } from './core/log-manager.service';
import { Logger } from './core/logger.service';

/**
 * View Component for Demonstration Purposes
 */
@Component({
    selector: 'app-root',
    templateUrl: './logview.component.html'
})
export class LogviewComponent implements OnInit {

    title = 'Logger Configuration Page';

    private log: Logger;

    public msg = 'test Message to Log';

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

    logError() {
        this.log.error(this.msg);
    }

    logVerbose() {
        this.log.verbose(this.msg);
    }

    logDebug() {
        this.log.debug(this.msg);
    }

    logInfo() {
        this.log.info(this.msg);
    }

    logWarn() {
        this.log.warn(this.msg);
    }

    logCritical() {
        this.log.critical(this.msg);
    }

    throwError() {
        throw new Error(this.msg);
    }

}
