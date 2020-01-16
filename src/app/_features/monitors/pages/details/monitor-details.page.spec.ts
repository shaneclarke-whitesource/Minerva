import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../../_shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MonitorsPage } from '../monitors/monitors.page';
import { MonitorDetailsPage } from './monitor-details.page';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';

const routes = [
  { path: 'resources',
    data: {
      breadcrumb: 'RESOURCES'
    },
    children: [{
      path: '',
      component: MonitorsPage,
      data: {
        breadcrumb: ''
      }
  },
  {
      path: ':id',
      component: MonitorDetailsPage,
      data: {
        breadcrumb: 'DETAILS'
      }
  }]
  }
];

describe('MonitorDetailComponent', () => {
  let component: MonitorDetailsPage;
  let fixture: ComponentFixture<MonitorDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ MonitorDetailsPage ],
      imports: [
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
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup defaults', () => {
    expect(component.monitor$).toBeDefined();
    expect(component.Object).toEqual(Object);
  });

  it('should have a route param', () => {
    expect(component.id).toEqual("anUniqueId");
  });

  it('should declare Object', () => {
    expect(component.Object).toEqual(Object);
  });

  it('should set to a single monitor', () => {
    component.monitor$.subscribe((monitor) => {
      expect(monitor).toEqual(new monitorsMock().single);
    });
  });
});
