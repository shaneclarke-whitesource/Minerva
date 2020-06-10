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
import { FormGroup, FormControl } from '@angular/forms';

describe('MonitorDetailComponent', () => {
  let injector: TestBed;
  let component: MonitorDetailsPage;
  let monitorService: MonitorService;
  let fixture: ComponentFixture<MonitorDetailsPage>;
  let schemaService: SchemaService;
  let definitions= {properties:{
    "type": {
      "type": "string",
      "enum": [
        "net_response"
      ],
      "default": "net_response"
    },
    "protocol": {
      "type": "string",
      "enum": [
        "udp",
        "tcp"
      ]
    },
    "host": {
      "type": "string",
      "pattern": "^.*\\S+.*$",
      "minLength": 1
    },
    "port": {
      "type": "integer",
      "minimum": 1,
      "maximum": 65535
    },
    "timeout": {
      "type": "string",
      "format": "date-time"
    },
    "readTimeout": {
      "type": "string",
      "format": "date-time"
    },
    "send": {
      "type": "string"
    },
    "expect": {
      "type": "string"
    }
  }}

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
    monitorService = injector.get(MonitorService);
    schemaService = injector.get(SchemaService);
    fixture = TestBed.createComponent(MonitorDetailsPage);
    schemaService.loadSchema();
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.monDetails=new monitorsMock().single;
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

    ["cpu","net_response",].forEach(element => {
      component.monDetails.details.plugin.type=element;
      component.creatDynamicConfig();
      expect(component.dynaConfig.length).toBeGreaterThan(1);
      done();
    });
  });
  it('should set default values to dynamic component',(done)=>{    
    
    let def=component.setDefaultValue(definitions);
    expect(def.properties.timeout.default).toBe(400);
    done();
  });
  it('should create plugin data if format type field value get change', (done) => {
    let form = {
      value: {
        host: "rackspace.com",
        port: 6000,
        protocol: "udp",
        readTimeout: "1000",
        send: "testing",
        timeout: "400"
      }
    }
    component.formatProp = ["timeout", "readTimeout"];
    let res = component.pluginProps(form);
    expect(res[0].value).toBe(form.value.readTimeout);
    done();
  })
  it('should create plugin data without format type field', (done) => {
    let form = {
      value: {
        host: "rackspace1.com",
        port: 6000,
        protocol: "udp",
        readTimeout: "123",
        send: "testing",
        timeout: "400"
      }
    }
    component.formatProp = ["timeout", "readTimeout"];
    let res = component.pluginProps(form);
    expect(res[0].value).toBe(form.value.host);
    done();
  })
  it('should unsubscribe on ngOnDestroy',done =>{
    spyOn(component.gc, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.gc.unsubscribe).toHaveBeenCalled();
    done();
  })
});
