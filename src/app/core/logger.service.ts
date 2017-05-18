import { LogLevel } from './log-level.enum';

/**
 * created with 'ng g service Logger'
 *
 * https://angular.io/docs/ts/latest/guide/style-guide.html#02-04
 * Do use consistent names for all services named after their feature.
 * Do suffix services with Service when it is not clear what they are (e.g. when they are nouns).
 * Clear service names such as Logger do not require a suffix.
 *
 * Naming as log4j in the Java World
 * private static final Logger logger = LogManager.getLogger("HelloWorld");
 *
 */
export class Logger {

    /**
     * Target of the Log Messages: Console, Graylog-Server (TODO), IndexDB (TODO)
     * @type {Console}
     */
    private _logEndpoint: any = console;


    public _currentLogLevel: LogLevel = LogLevel.Info;

    /**
     * Context of the Logger e.g. the domain 'kfz', 'inex', etc
     */
    private _context: Array<string> = new Array<string>();

    public moduleColor = 'gray';

    public setContext(context: Array<string>) {
        this._context = context;
    }

    public getContext(): Array<string> {
        return this._context;
    }

    public setLogEndpoint(endpoint: any) {
        this._logEndpoint = endpoint;
    }

    public getCurrentLogLevel(): LogLevel {
        return this._currentLogLevel;
    }

    public setCurrentLogLevel(logLevel: LogLevel) {
        this._currentLogLevel = logLevel;
    }

    private getRandomColor(): string {
        let letters = '012345'.split('');
        let color = '#';
        color += letters[Math.round(Math.random() * 5)];
        letters = '0123456789ABCDEF'.split('');

        for (let i = 0; i < 5; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }

        if (color === undefined) {
            return this.getRandomColor();
        }
        return color;
    }

    public setConsoleColor(moduleColor?: string) {
        if (!moduleColor) {
            this.moduleColor = this.getRandomColor();
        } else {
            this.moduleColor = moduleColor;
        }
    }

    private getLevelColor(logLevel: LogLevel): string {

        let color = 'gray';
        if (logLevel) {
            switch (logLevel) {
                case LogLevel.Critical:
                    color = '#FF4000';
                    break;
                case LogLevel.Verbose:
                    color = '#FA58F4';
                    break;
                case LogLevel.Debug:
                    color = 'blue';
                    break;
                case LogLevel.Info:
                    color = 'darkgreen';
                    break;
                case LogLevel.Warning:
                    color = 'orange';
                    break;
                case LogLevel.Error:
                    color = 'red';
                    break;
                default:
                    return 'gray';
            }
        }

        return color;
    }


    /**
     * writes a Log Entry with logLevel
     * @param message
     * @param logLevel
     */
    public log(logLevel?: LogLevel, ...message: any[]): boolean {

        if (this._logEndpoint) {
            if (this._currentLogLevel > logLevel) {
                return false;
            } else {
                this.msg(logLevel, message);
                return true;
            }
        }

        // returns flag for testability
        return false;
    }


    public verbose(...message: any[]): boolean {
        try {
            throw new Error('');
        } catch (e) {
            message.push(e.stack);
        }
        return this.log(LogLevel.Verbose, message);
    }

    public debug(...message: any[]): boolean {
        return this.log(LogLevel.Debug, message);
    }

    public info(...message: any[]): boolean {
        return this.log(LogLevel.Info, message);
    }

    public warn(...message: any[]): boolean {
        return this.log(LogLevel.Warning, message);
    }

    public error(...message: any[]): boolean {
        try {
            throw new Error('');
        } catch (e) {
            message.push(e.stack);
        }

        return this.log(LogLevel.Error, message);
    }

    public critical(...message: any[]): boolean {
        try {
            throw new Error('');
        } catch (e) {
            message.push(e.stack);
        }
        return this.log(LogLevel.Critical, message);
    }


    private msg(level: LogLevel, ...params: any[]) {

        // remove array wrapper for a nicer presentation in the console
        if (Array.isArray(params)) {
            params = params.pop();
            params = params.pop();
        }

        const ts = `${new Date().toISOString()} - `;

        let loglevel = `${ LogLevel[level] }`;

        loglevel = ' '.repeat(9 - loglevel.length) + loglevel;

        const levelColor: string = this.getLevelColor(level);

        if (Array.isArray(params)) {

            let context = '';

            for (let _i = 0; _i < this._context.length; _i++) {
                context += this._context[_i];
                if (_i < this._context.length - 1) {
                    context += ' | ';
                }
            }

            params.unshift('border: 1px solid ' + levelColor + '; color:' + levelColor);
            params.unshift('background: ' + this.moduleColor + ';color:white; ' + 'border: 1px solid ' + levelColor + '; ');
            params.unshift('%c ' + context + ' %c ' + ts + loglevel);
        }

        this._logEndpoint.log.apply(this._logEndpoint, params);
    }

}
