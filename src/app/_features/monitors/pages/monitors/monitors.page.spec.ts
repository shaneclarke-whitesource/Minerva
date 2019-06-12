import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsPage } from './monitors.page';

describe('MonitorsPage', () => {
  let component: MonitorsPage;
  let fixture: ComponentFixture<MonitorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
