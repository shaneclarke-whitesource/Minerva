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
      component: ResourceDetailsPage,
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
            params: of({id: "uniqueId"}),
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

  it('should setup defaults', () => {
    expect(component.resource$).toBeDefined();
    expect(component.Object).toEqual(Object);
    expect(component.metaLoading).toEqual(false);
    expect(component.labelsLoading).toEqual(false);
    expect(component.metaPopPencil).toBeDefined();
    expect(component.labelPopPencil).toBeDefined()
    expect(component.subManager).toBeDefined();
  });

  it('should have a route param', () => {
    expect(component.id).toEqual("uniqueId");
  });

  it('should update and format meta values', () => {
    component.metaValueUpdated(keyPair);
    expect(component.updatedMetaFields).toEqual(formattedKeyPair);
  });

  it('should update & format label values', () => {
    component.labelsUpdated(keyPair);
    expect(component.updatedLabelFields).toEqual(formattedKeyPair);
  });

  it('should set to a single resource', () => {
    let mocked = new resourcesMock().single;
    component.resource$.subscribe((resource) => {
      expect(resource).toEqual(mocked);
    });

  })
});
