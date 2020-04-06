import { TestBed, getTestBed } from '@angular/core/testing';
import { SchemaService, AJV_INSTANCE } from './schema.service';
import { HttpClientModule } from '@angular/common/http';
import { AJV_CLASS, AJV_CONFIG, createAjvInstance } from 'src/app/_features/monitors/monitors.module';
import ajv from 'ajv';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';

describe('SchemaService', () => {
  let injector: TestBed;
  let service: SchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: AJV_CLASS, useValue: ajv },
        { provide: AJV_CONFIG, useValue: { useDefaults: true } },
        {
          provide: AJV_INSTANCE,
          useFactory: createAjvInstance,
          deps: [AJV_CLASS, AJV_CONFIG]
        }]
    });
    injector = getTestBed();
    service = injector.get(SchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set & get schema', () => {
    service.schema = new monitorsMock().schema;
    expect(service.schema.description).toEqual("Salus Monitor definition");
  });

  it('should load schema file', () => {

  })


});
