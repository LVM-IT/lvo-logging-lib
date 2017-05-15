/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { LogviewComponent } from './logview.component';
import { environment } from '../environments/environment';
import { LoggingModule } from './logging/logging.module';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogviewComponent
      ],
      imports: [
          LoggingModule
      ]
    });
    TestBed.compileComponents();
  });

  it('should create a Logview Component with a Logger', async(() => {
    const fixture = TestBed.createComponent(LogviewComponent);

    const app = fixture.debugElement.componentInstance;
    // test app construction
    expect(app).toBeTruthy();
    // test logger injection
    expect(app.log).toBeTruthy();
    // Test Classname Injection
    expect(app.log._context).toContain('LogviewComponent');

    app.log.info('Jenkins env ? ' + environment.production);

    app.ngOnInit();
  }));









});
