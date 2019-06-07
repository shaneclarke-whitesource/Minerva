import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ResourcesPage } from '../resources/resources.page';
import { ResourceDetailsPage } from './resource-details.page';
import { ResourcesListComponent } from '../../components/list/resourceslist.component';
import { resourcesMock } from '../../../../_mocks/resources/resources.service.mock';
import { SharedModule } from '../../../../_shared/shared.module';

const routes = [
  { path: 'resources',
    data: {
      breadcrumb: 'RESOURCES'
    },
    children: [{
      path: '',
      component: ResourcesPage,
      data: {
        breadcrumb: ''
      }
  },
  {
      path: ':id',
      component: ResourceDetailsPage,
      data: {
        breadcrumb: 'DETAILS'
      }
  }]
  }
];

describe('ResourceDetailsPage', () => {
  let component: ResourceDetailsPage;
  let fixture: ComponentFixture<ResourceDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        ResourcesListComponent,
        ResourcesPage,
        ResourceDetailsPage
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123}),
            root: {
              routeConfig : routes[0]
            }
          }
        }
      ],
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a route param', () => {
    expect(component.id).toEqual(123);
  });

  it('should declare Object', () => {
    expect(component.Object).toEqual(Object);
  })

  it('should set to a single resource', () => {
    let mocked = new resourcesMock().single;
    expect(component.resource).toEqual(mocked.content[0]);
  })
});
