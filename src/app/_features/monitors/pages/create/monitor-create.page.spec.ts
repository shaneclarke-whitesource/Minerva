import { CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MonitorService } from 'src/app/_services/monitors/monitor.service';
import { LabelService } from 'src/app/_services/labels/label.service';
import { MonitorCreatePage } from './monitor-create.page';
import { SharedModule } from 'src/app/_shared/shared.module';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';
import { LabelMock } from 'src/app/_mocks/labels/label.service.mock';
import { SchemaService, AJV_INSTANCE } from 'src/app/_services/monitors/schema.service';
import {routes } from '../../monitors.routes';
import { AJV_CLASS, AJV_CONFIG, createAjvInstance } from '../../monitors.module';
import ajv from 'ajv';
import { MonitorsPage } from '../monitors/monitors.page';
import { MarkFormGroupTouched } from 'src/app/_shared/utils';

const keyPair = {
  keysandvalues: [
  {
    key: 'newkey',
    value: 'newpair'
  },
  {
    key: 'likelykey',
    value: 'likelypair'
  },
  {
    key: 'somekey',
    value: 'somepair'
  },
  {
    key: 'fourthkey',
    value: 'fourthpair'
  }
]};
describe('MonitorCreatePage', () => {
let injector: TestBed;
let component: MonitorCreatePage;
let fixture: ComponentFixture<MonitorCreatePage>;
let schemaService: SchemaService;
let monitorService: MonitorService;
let spySubManager;
let spyMonitorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        MonitorCreatePage, MonitorsPage
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'monitors', component: MonitorsPage}]
        ),
        SharedModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            root: {
              routeConfig : routes[0]
            }
          }
        },
        MonitorService,
        LabelService,
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
    schemaService = injector.get(SchemaService);
    monitorService = injector.get(MonitorService);
    fixture = TestBed.createComponent(MonitorCreatePage);
    component = fixture.componentInstance;
    schemaService.loadSchema();
    spySubManager = spyOn(component.subManager, 'add');
    spyMonitorService = spyOn(monitorService, 'createMonitor');
    fixture.detectChanges();
  });

  afterEach(() => {
    monitorService.monitor = undefined;
    monitorService.monitors = undefined;
  })

  // create reusable function for a dry spec.
  function updateForm(name, type) {
    component.createMonitorForm.controls['name'].setValue(name);
    component.createMonitorForm.controls['type'].setValue(type);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup defaults', () => {
    expect(component['labelSubmit']).toBeDefined();
    expect(component['labelFormValid']).toBeDefined();
    expect(component['dynamicFormSubmit']).toBeDefined();
    expect(component['dynamicFormValid']).toBeDefined();
    expect(component.addMonLoading).toEqual(false);
    expect(component.updatedLabelFields).toBeDefined();
    expect(component.subManager).toBeDefined();
    expect(component.dynaConfig).toBeDefined();
    expect(component.listOfKeys).toBeDefined();
    expect(component.listOfValues).toBeDefined();
    expect(component.typesOfMonitors).toBeDefined();
    expect(component.selectedMonitor).toBeDefined();
    expect(component.markFormGroupTouched).toEqual(MarkFormGroupTouched);
    expect(component.mf).toBeDefined();
  });

  it('should get monitor form (mf) and return createMonitorForm controls', () => {
    expect(Object.keys(component.mf).length).toEqual(2);
  });

  it('should be invalid createMonitorForm', () => {
    updateForm('coolName', '');
    expect(component.createMonitorForm.valid).toEqual(false);
  });

  it('should be valid createMonitorForm', () => {
    updateForm('coolName', 'cpu');
    expect(component.createMonitorForm.valid).toEqual(true);
  });

  it('should update labels from add-fields component', () => {
    const formattedKeyPair = {
      newkey: 'newpair',
      likelykey: 'likelypair',
      somekey: 'somepair',
      fourthkey: 'fourthpair'
    }
    component.labelsUpdated(keyPair);
    expect(component.updatedLabelFields).toEqual(formattedKeyPair);
  });

  it('should add typesOfMonitors', () => {
    expect(component.typesOfMonitors).toEqual(Object.keys(new monitorsMock().schema.definitions));
  });

  it('should add listOfKeys & listOfValues', () => {
    expect(component.listOfKeys).toEqual(Object.keys(new LabelMock().resourceLabels));
    expect(component.listOfValues).toEqual(Object.values(new LabelMock().resourceLabels).flat());
  });

  it('should add 3 subscriptions to subManager', () => {
    updateForm('coolName', 'cpu');
    expect(spySubManager).toHaveBeenCalledTimes(3);
  });

  it('should addMonitor() using service', () => {
    fixture.ngZone.run(async() => {
      updateForm('coolName', 'cpu');
      await component.addMonitor();
      expect(monitorService.createMonitor);
    });
  });

  it('should make selectedMonitor equal to dropdown selection', () => {
    component.loadMonitorForm('Disk');
    expect(component.selectedMonitor).toEqual('Disk');
  });

  it('should loadMonitorForm()', () => {
    component.loadMonitorForm('Disk');
    expect(JSON.stringify(component.dynaConfig))
    .toEqual(`[{"type":"input","label":"mount","name":"mount","inputType":"text","validations":[{"name":"required","message":"mount Required"},{"name":"pattern","message":"mount format incorrect"},{"name":"minimum","message":"mount must be at least 1 character(s)"}]}]`)
  });

  it('should unsubscribe on ngOnDestroy', () => {
    spyOn(component.subManager, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subManager.unsubscribe).toHaveBeenCalled();
  });
});
