/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { LogManager } from './log-manager.service';
import { LogLevel } from './log-level.enum';

describe('LogManagerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LogManager]
        });
    });

    it('should logManager be injectable', inject([LogManager], (logManager: LogManager) => {
        expect(logManager).toBeTruthy();
    }));

    it(`should logmanager maintain registered logger with hierarchy 
    and switch log level on certain context level`, inject([LogManager], (logManager: LogManager) => {


        const kRisikenContext = ['kraftfahrt', 'risiken'];

        const logger0 = logManager.getLogger(logManager);
        expect(logManager.getLoggerByContext().length).toBe(1);

        const kfzLogger = logManager.getLogger('kraftfahrt');
        expect(logManager.getLoggerByContext().length).toBe(2);

        // context with subcontexts as array
        const rootContext = ['kraftfahrt'];
        const logger2 = logManager.getLogger(rootContext);
        // same context than before, therefore no additional logger
        expect(logManager.getLoggerByContext().length).toBe(2);

        // context with subcontexts as array
        const fahrerLogger = logManager.getLogger(['kraftfahrt', 'fahrer']);
        expect(logManager.getLoggerByContext().length).toBe(3);

        const riskLogger1 = logManager.getLogger(kRisikenContext);
        expect(logManager.getLoggerByContext().length).toBe(4);

        const riskLogger2 = logManager.getLogger(['kraftfahrt', 'risiken', 'test']);
        expect(logManager.getLoggerByContext().length).toBe(5);

        expect(logManager.getLoggerByContext(rootContext).length).toBe(4);
        expect(logManager.getLoggerByContext(kRisikenContext).length).toBe(2);

        expect(kfzLogger.debug('Hello Driver')).toBe(false);
        expect(riskLogger1.debug('Hello Risk1')).toBe(false);
        expect(riskLogger2.debug('Hello Risk2')).toBe(false);
        expect(fahrerLogger.debug('Hello Driver')).toBe(false);

        // change log level on risklevel
        logManager.setCurrentLogLevel(LogLevel.Debug, kRisikenContext);

        expect(riskLogger1.debug('Hello Risk1')).toBe(true);
        expect(riskLogger2.debug('Hello Risk2')).toBe(true);
        expect(fahrerLogger.debug('Hello Driver')).toBe(false);
        expect(kfzLogger.debug('Hello Driver')).toBe(false);

        // change log level global
        logManager.setCurrentLogLevel(LogLevel.Info);

        expect(riskLogger1.debug('Hello Risk1')).toBe(false);
        expect(riskLogger2.debug('Hello Risk2')).toBe(false);
        expect(fahrerLogger.debug('Hello Driver')).toBe(false);
        expect(kfzLogger.debug('Hello Driver')).toBe(false);

        // change log level global
        logManager.setCurrentLogLevel(LogLevel.Debug);
        expect(riskLogger1.debug('Hello Risk1')).toBe(true);
        expect(riskLogger2.debug('Hello Risk2')).toBe(true);
        expect(fahrerLogger.debug('Hello Driver')).toBe(true);
        expect(kfzLogger.debug('Hello Driver')).toBe(true);

    }));


    it('should logger be createable ...', inject([LogManager], (logManager: LogManager) => {
        expect(logManager).toBeTruthy();

        // create logger with context and subcontext and colour
        const logger1 = logManager.getLogger(['ctx1', 'ctx2', 'ctx3'], 'red');
        logger1.info('#logmanager.getLogger 1', 'logger=', logger1, 'context=', logger1.getContext(), 'logmanager=', logManager);
        expect(logger1).toBeTruthy();

        // create logger with context named like the instance object name and colour
        const logger2 = logManager.getLogger(logManager, 'green');
        logger2.info('#logmanager.getLogger 2', logger2, logger2.getContext());
        expect(logger2).toBeTruthy();

        // create logger with one context an one colour
        const logger3 = logManager.getLogger('log2', 'blue');
        logger3.info('#logmanager.getLogger 3', logger3, logger3.getContext());
        expect(logger3).toBeTruthy();

        // create logger with context and subcontext
        const logger4 = logManager.getLogger(['log1', '123']);
        logger4.info('#logmanager.getLogger 4', logger4, logger4.getContext());
        expect(logger4).toBeTruthy();

        // create logger with context named like the instance object without
        const logger5 = logManager.getLogger(logManager);
        logger5.info('#logmanager.getLogger 5', logger5, logger5.getContext());
        expect(logger5).toBeTruthy();

        const logger6 = logManager.getLogger('log6');
        logger6.info('#logmanager.getLogger 6', logger6, logger6.getContext());
        expect(logger6).toBeTruthy();

    }));

});
