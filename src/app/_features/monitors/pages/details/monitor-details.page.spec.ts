import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../../_shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MonitorsPage } from '../monitors/monitors.page';
import { MonitorService } from '../../../../_services/monitors/monitor.service'
import { MonitorDetailsPage } from './monitor-details.page';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';
import { MonitorslistComponent } from '../../components/list/monitorslist.component';
import { routes } from '../../monitors.routes';

describe('MonitorDetailComponent', () => {
  let injector: TestBed;
  let component: MonitorDetailsPage;
  let monitorService: MonitorService;
  let fixture: ComponentFixture<MonitorDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        MonitorsPage,
        MonitorslistComponent,
        MonitorDetailsPage
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: "anUniqueId"}),
            root: {
              routeConfig : routes[0]
            }
          }
        },
        MonitorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(MonitorDetailsPage);
    component = fixture.componentInstance;
    monitorService = injector.get(MonitorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup defaults', () => {
    expect(component.monitor$).toBeDefined();
    expect(component.Object).toEqual(Object);
    expect(component.deleteLoading).toEqual(false);
    expect(component.delMonitor).toBeDefined();
    expect(component.delMonitorFailure).toBeDefined();
    expect(component.additionalSettings).toEqual('out');
  });


  it('should set to a single monitor', (done) => {
    component.monitor$.subscribe((monitor) => {
      expect(monitor).toEqual(new monitorsMock().single);
      done();
    });
  });

  it('should delete a monitor', (done) => {
    let spy = spyOn(monitorService, 'deleteMonitor').and.returnValue(of());
    component.deleteMonitor('monitorID8772');
    expect(spy).toHaveBeenCalled();
    done();
  });

  it('should declare Object', () => {
    expect(component.Object).toEqual(Object);
  });
});
