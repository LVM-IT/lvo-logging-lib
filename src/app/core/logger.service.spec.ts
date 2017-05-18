/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';
import { LogLevel } from './log-level.enum';
import { LogManager } from './log-manager.service';

describe('Logger', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LogManager]
        });
    });

    it('should logManager be injectable and be able to create a logger', inject([LogManager], (logManager: LogManager) => {
        expect(logManager).toBeTruthy();
        expect(logManager.getLogger('myLoggingContext')).toBeTruthy();
    }));


    it(`should Default Log Level be 'Info'`, inject([LogManager], (logManager: LogManager) => {
        const logger = logManager.getLogger('1');
        // Default Log Level prüfen
        expect(logger.getCurrentLogLevel()).toEqual(LogLevel.Info);
    }));


    it(`the Default Loglevel should be changeable to Debug Level`, inject([LogManager], (logManager: LogManager) => {
        const logger = logManager.getLogger('1');
        logger.setCurrentLogLevel(LogLevel.Debug);
        expect(logger.getCurrentLogLevel()).toEqual(LogLevel.Debug);
    }));

    it(`the LogLevel sequence should start with Verbose and end with Critical`, inject([LogManager], (logManager: LogManager) => {
        // sicherstellen, dass die Reihenfolge im enum nicht geändert wird
        expect(LogLevel.Verbose).toBeGreaterThan(LogLevel.Nothing);
        expect(LogLevel.Debug).toBeGreaterThan(LogLevel.Verbose);
        expect(LogLevel.Info).toBeGreaterThan(LogLevel.Debug);
        expect(LogLevel.Warning).toBeGreaterThan(LogLevel.Info);
        expect(LogLevel.Error).toBeGreaterThan(LogLevel.Warning);
        expect(LogLevel.Critical).toBeGreaterThan(LogLevel.Error);
    }));


    it('a Logger without a Context should not be createable --> Exception', inject([LogManager], (logManager: LogManager) => {
        expect(function () {
            logManager.getLogger(null);
        }).toThrow(new Error('NoContext'));
    }));


});
