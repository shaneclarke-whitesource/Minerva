import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocDataCallComponent } from './poc-data-call.component';

describe('PocDataCallComponent', () => {
  let component: PocDataCallComponent;
  let fixture: ComponentFixture<PocDataCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocDataCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocDataCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
