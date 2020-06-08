import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ajv from 'ajv';
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
import { SchemaService, AJV_INSTANCE } from 'src/app/_services/monitors/schema.service';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { AJV_CLASS, AJV_CONFIG, createAjvInstance } from '../../monitors.module';

describe('MonitorDetailComponent', () => {
  let injector: TestBed;
  let component: MonitorDetailsPage;
  let monitorService: MonitorService;
  let fixture: ComponentFixture<MonitorDetailsPage>;
  let schemaService: SchemaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        MonitorsPage,
        MonitorslistComponent,
        MonitorDetailsPage,
        DynamicFormComponent
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
        MonitorService,
        SchemaService,
        { provide: AJV_CLASS, useValue: ajv },
        { provide: AJV_CONFIG, useValue: { useDefaults: true } },
        {
          provide: AJV_INSTANCE,
          useFactory: createAjvInstance,
          deps: [AJV_CLASS, AJV_CONFIG]
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(MonitorDetailsPage);
    component = fixture.componentInstance;
    monitorService = injector.get(MonitorService);
    schemaService = injector.get(SchemaService);
    schemaService.loadSchema();
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
  it('should initialize the dynamic config object', (done)=>{
    component.monitoryType = 'net_response';
    component.monitorDetailsubForm();
    component.monitor$.subscribe(() =>{
      expect(component.dynaConfig.length).toBeGreaterThan(1);
      done();
    });   
  })
});
