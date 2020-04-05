import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MonitorService } from 'src/app/_services/monitors/monitor.service';
import { LabelService } from 'src/app/_services/labels/label.service';
import { MonitorCreatePage } from './monitor-create.page';
import { SharedModule } from 'src/app/_shared/shared.module';
import { SchemaService, AJV_INSTANCE } from 'src/app/_services/monitors/schema.service';
import {routes } from '../../monitors.routes';
import { AJV_CLASS, AJV_CONFIG, createAjvInstance } from '../../monitors.module';
import ajv from 'ajv';

describe('MonitorCreatePage', () => {
  let component: MonitorCreatePage;
  let fixture: ComponentFixture<MonitorCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ MonitorCreatePage ],
      imports: [
        SharedModule,
        RouterTestingModule
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
    fixture = TestBed.createComponent(MonitorCreatePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
