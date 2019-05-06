import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ResourceDetailsPage } from './resource-details.page';
import { HttpClientModule } from '@angular/common/http';
import { resourcesMock } from '../../../../_mocks/resources/resources.service.mock';

describe('ResourceDetailsPage', () => {
  let component: ResourceDetailsPage;
  let fixture: ComponentFixture<ResourceDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceDetailsPage ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
        }
      ],
      imports: [
        HttpClientModule
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

  it('should set to a single resource', () => {
      expect(component.resource).toEqual(new resourcesMock().single);
  })
});
