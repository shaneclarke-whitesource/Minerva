import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesPage } from './resources.page';
import { ResourcesListComponent } from '../../components/list/resourceslist.component';
import { HttpClientModule } from '@angular/common/http';

describe('ResourcesPage', () => {
  let page: ResourcesPage;
  let fixture: ComponentFixture<ResourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResourcesPage,
        ResourcesListComponent
      ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesPage);
    page = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(page).toBeTruthy();
  });
});
