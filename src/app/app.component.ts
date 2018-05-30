import { Component, OnInit } from '@angular/core';
import { Logger, LogManager } from '@lvo/logging';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'lvo-logging-lib-demo';
    public msg = 'test Message to Log';
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
