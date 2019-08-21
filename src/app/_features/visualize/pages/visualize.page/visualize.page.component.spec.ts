import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { VisualizePage } from './visualize.page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../../../_shared/shared.module';

const routes = [
  {
    path: 'visualize',
    data: {
      breadcrumb: 'GRAPHS'
    }
  }, {
    queryParams: {
      system: 'zenoss',
      measurement: 'cpu_check',
      device: '466255362',
      start: '328833',
      end: '8829938'
    }
  }
];

describe('VisualizePage', () => {
  let component: VisualizePage;
  let fixture: ComponentFixture<VisualizePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        VisualizePage
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          queryParamMap: of({
            get: (query: string) => {
              switch (query) {
                case 'system':
                  return routes[1].queryParams.system;
                case 'measurement':
                  return routes[1].queryParams.measurement;
                case 'device':
                  return routes[1].queryParams.device;
                case 'start':
                  return routes[1].queryParams.start;
                case 'end':
                  return routes[1].queryParams.end;
              }
            }
          }),
          root: {
            routeConfig: routes[0]
          }
        }
      }],
      imports: [
        SharedModule,
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading to true', () => {
    expect(component.loading).toEqual(true);
  });

  describe('- <app-visualize-selections> set attributes', () => {
    it('should set system', () => {
      expect(fixture.debugElement.query(By.css('app-visualize-selections'))
        .componentInstance.system).toBe(routes[1].queryParams.system);
    });

    it('should set measurement', () => {
      expect(fixture.debugElement.query(By.css('app-visualize-selections'))
        .componentInstance.measurement).toBe(routes[1].queryParams.measurement);
    });

    it('should set device', () => {
      expect(fixture.debugElement.query(By.css('app-visualize-selections'))
        .componentInstance.device).toBe(routes[1].queryParams.device);
    });

    it('should set start', () => {
      expect(fixture.debugElement.query(By.css('app-visualize-selections'))
        .componentInstance.start).toBe(routes[1].queryParams.start);
    });

    it('should set end date', () => {
      expect(fixture.debugElement.query(By.css('app-visualize-selections'))
        .componentInstance.end).toBe(routes[1].queryParams.end);
    });
  });

  it('should be present', () => {
    expect(fixture.debugElement.query(By.css('app-graphs'))
    .componentInstance).not.toBe(null);
  });

});
