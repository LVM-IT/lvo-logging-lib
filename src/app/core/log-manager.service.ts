import { Injectable, NgZone } from '@angular/core';
import { Logger } from './logger.service';
import { LogLevel } from './log-level.enum';

/**
 * LogManager is the Factory for creation Logger for a certain context
 * usage:
 *      inject the logManager via constructor
 *      this.log = logManager.getLogger(this, '#4863A0');
 *
 */
@Injectable()
export class LogManager {

    private _loggerMap: Map<string, any> = new Map();

    public _currentLogLevel: LogLevel = LogLevel.Info;


    /**
     * set _ngZone to enable access from the Browser Console
     *
     * access logger instance with 'log.service'
     * access logger-registry instance with with 'log.map'
     *
     * @param _ngZone
     */
    constructor(private _ngZone?: NgZone) {
        if (_ngZone) {
            window['log'] = {map: this._loggerMap, logmanager: this, zone: _ngZone};
        }
    }

    private isString(x: any): x is string {
        return typeof x === 'string';
    }


    /**
     * Factory Method, um jeder Klasse die Möglichkeit zu geben, seinen eigenen Logger zu instanziieren
     * @param context - a string or an instance or a context instance
     * @returns {Logger}
     */
    public getLogger(context: any, moduleColor?: string): Logger {
        if (context) {

            const ls: Logger = new Logger();
            if (this._currentLogLevel) {
                ls.setCurrentLogLevel(this._currentLogLevel);
            }
            ls.setContext(this.getContext(context));
            ls.setConsoleColor(moduleColor);
            this.registerLogger(ls);

            return ls;
        }

        throw new Error('NoContext');
    }

    private registerLogger(ls: Logger) {

        if (ls) {
            const context = ls.getContext();
            if (context && context.length > 0) {
                // build linked Maps according to the Context to enable LogLevel Settings and other on context and subcontext level
                let lastMap = this._loggerMap;
                for (let _i = 0; _i < context.length; _i++) {
                    const key = context[_i];
                    const object = lastMap.get(key);
                    if (!object) {
                        // No Logger oder Map with Logger under defined key
                        if (_i === context.length - 1) {
                            // no subcontext --> register Logger
                            const root = new Map();
                            root.set('root', ls);
                            lastMap.set(key, root);
                        } else {
                            // create Map for subcontext
                            const subContextMap = new Map();
                            lastMap.set(key, subContextMap);
                            // Point to new Map
                            lastMap = subContextMap;
                        }
                    } else {
                        lastMap = object;
                    }
                }
            }
        }
    }

    /**
     * build linked Maps according to the Context to enable LogLevel Settings and other on context and subcontext level
     *
     * @param context
     * @returns {Map<string, any>}
     */
    public getLoggerMap(context?: Array<string>): Map<string, any> {
        if (context && context.length > 0) {
            let lastMap = this._loggerMap;
            for (let _i = 0; _i < context.length; _i++) {
                const key = context[_i];
                const object = lastMap.get(key);
                if (object) {
                    lastMap = object;
                }
            }
            return lastMap;
        }
        return this._loggerMap;
    }


    public getLoggerByContext(context?: Array<string>): Array<Logger> {
        const loggerArray = new Array<Logger>();

        const map: Map<string, any> = this.getLoggerMap(context);
        this.addLoggerFromMapToArray(map, loggerArray);

        return loggerArray;
    }

    private addLoggerFromMapToArray(map: Map<string, any>, loggerArray: Array<Logger>) {
        if (map) {
            map.forEach((value: any, key: string) => {
                console.log(key, value);
                if (value instanceof Logger) {
                    loggerArray.push(value);
                } else {
                    this.addLoggerFromMapToArray(value, loggerArray);
                }
            });
        }
    }

    private getContext(object: any): Array<string> {

        let context: Array<string> = new Array<string>();

        if (Array.isArray(object)) {
            context = object;
        } else if (this.isString(object)) {
            context.push(object);
        } else {
            context.push(object.constructor.name);
        }

        return context;
    }

    public setCurrentLogLevel(logLevel: LogLevel, context?: Array<string>) {

        this._currentLogLevel = logLevel;

        const loggerArray = this.getLoggerByContext(context);
        for (const logger of loggerArray) {
            logger.setCurrentLogLevel(logLevel);
        }

    }

}
