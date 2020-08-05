import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ResourcesPage } from '../../../../../../../../../src/app/_features/resources/pages/resources/resources.page';

import { AdminResourceDetailsPage } from './admin-resource-details.page';
import { ResourcesListComponent } from '../../../../../../../../../src/app/_features/resources/components/list/resourceslist.component';
import { resourcesMock } from '../../../../../../../../../src/app/_mocks/resources/resources.service.mock';
import { SharedModule } from '../../../../../../../../../src/app/_shared/shared.module';
import { ResourcesService } from 'src/app/_services/resources/resources.service';
import { of, Observable } from 'rxjs';

const routes = [
  {
    path: 'resources',
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
      component: AdminResourceDetailsPage,
      data: {
        breadcrumb: 'DETAILS'
      }
    }]
  }
];

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

const formattedKeyPair = {
  newkey: 'newpair',
  likelykey: 'likelypair',
  somekey: 'somepair',
  fourthkey: 'fourthpair'
}

describe('AdminResourceDetailsPage', () => {
  let injector: TestBed;
  let component: AdminResourceDetailsPage;
  let fixture: ComponentFixture<AdminResourceDetailsPage>;
  let resourceService: ResourcesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        ResourcesListComponent,
        ResourcesPage,
        AdminResourceDetailsPage
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: "uniqueId"}),
            root: {
              routeConfig : routes[0]
            }
          }
        },
        ResourcesService
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
    injector = getTestBed();
    fixture = TestBed.createComponent(AdminResourceDetailsPage);
    component = fixture.componentInstance;
    resourceService = injector.get(ResourcesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup defaults', () => {
    expect(component.Object).toEqual(Object);
    expect(component.metaLoading).toEqual(false);
    expect(component.labelsLoading).toEqual(false);
    expect(component.deleteLoading).toEqual(false);
    expect(component.subManager).toBeDefined();
  });
});
