# @lvo/logging

[![npm version](https://badge.fury.io/js/%40lvo%2Flogging.svg)](https://badge.fury.io/js/%40lvo%2Flogging)
[![Build Status](https://travis-ci.org/LVM-IT/lvo-logging-lib.svg?branch=master)](https://travis-ci.org/LVM-IT/lvo-logging-lib)
[![codecov](https://codecov.io/gh/LVM-IT/lvo-logging-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/LVM-IT/lvo-logging-lib)
[![Known Vulnerabilities](https://snyk.io/test/github/lvm-it/lvo-logging-lib/badge.svg?targetFile=logging%2Fpackage.json)](https://snyk.io/test/github/lvm-it/lvo-logging-lib?targetFile=logging%2Fpackage.json)
[![Dependency Status][david-badge]][david-badge-url]
[![devDependency Status][david-dev-badge]][david-dev-badge-url]


## Usage

### Usage in Code

#### Dependency Import
 
>     npm install @lvo/logging --save-dev 

or add to package.json
>     "dependencies": {    
>         "@lvo/logging": "1.0.0"
>      }

#### Module Import

```javascript
     import { LoggingModule } from '@lvo/logging';

     @NgModule({  
       imports: [
         LoggingModule,
         ...
```

#### Logger Construction and Usage
```typescript
     import { Logger, LogManager } from '@lvo/logging';
     @Injectable()
     export class AClassWithLogging {
           private logger: Logger;
 
           constructor(private logManager: LogManager) {
              // create Logger with Class Context
              this.logger = logManager.getLogger(this);

              // create logger with Context Hierarchy
              // now you are able to switch all Logger in context ['c1','c2'] to debug level for example  
              this.logger.debug(['c1','c2','c3']);

              // use Logger  
              this.logger.debug('Hello ..');
             
           }
```

#### Access to the Logging Facility via Browser Console
```typescript
     LogManager         :  log.logmanager   
     registered Logger  :  log.map
     set log level      :  log.logmanager.setCurrentLogLevel(4, ['c1','c2'])

     export enum LogLevel {
        Nothing, // 0
        Verbose, // 1
        Debug,   // 2
        Info,    // 3
        Warning, // 4
        Error,   // 5
        Critical // 6
     }



```

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng test --code-coverage --single-run` to create a test coverage Report


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.



[david-badge]: https://david-dm.org/lvm-it/lvo-logging-lib.svg
[david-badge-url]: https://david-dm.org/lvm-it/lvo-logging-lib
[david-dev-badge]: https://david-dm.org/lvm-it/lvo-logging-lib/dev-status.svg
[david-dev-badge-url]: https://david-dm.org/lvm-it/lvo-logging-lib?type=dev