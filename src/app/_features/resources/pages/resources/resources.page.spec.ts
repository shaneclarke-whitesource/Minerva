import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ResourcesListComponent } from '../../components/list/resourceslist.component';
import { HttpClientModule } from '@angular/common/http';
import { ResourcesPage } from './resources.page';

describe('ResourcesPage', () => {
  let page: ResourcesPage;
  let fixture: ComponentFixture<ResourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        ResourcesPage,
        ResourcesListComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
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
