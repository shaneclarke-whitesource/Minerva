import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { ResourcesService } from 'src/app/_services/resources/resources.service';
import { HttpClientModule } from '@angular/common/http';
import { Resources } from 'src/app/_models/resources';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let injector: TestBed;
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let resourceService: ResourcesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ HttpClientModule],
      providers: [ ResourcesService ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    resourceService = injector.get(ResourcesService);
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup defaults', () => {
    expect(component.searchResources).toBeDefined();
    expect(component.searchResults).toEqual(new EventEmitter<Resources>());
    expect(component.searching).toEqual(new EventEmitter<boolean>());
  });

  fit('should make search for text input results', () => {
    component.searchResults.subscribe((resources: Resources) => {
      expect(resources.content.length).toBeGreaterThan(2);
    });

    const el = fixture.debugElement.query(By.css('input#txtSearch'));
    el.nativeElement.dispatchEvent(new Event('input'));
    el.nativeElement.dispatchEvent(new Event('focus'));
    el.nativeElement.dispatchEvent(new Event('focusin'));
    el.nativeElement.value = 'cool';
    el.nativeElement.dispatchEvent(new Event('input'));
    el.nativeElement.dispatchEvent(new Event('keydown'));
    el.nativeElement.dispatchEvent(new Event('keyup'));
  });

  it('should unsubscribe upon component destroy', () => {
    let spy = spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  })

});
