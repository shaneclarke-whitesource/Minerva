import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorCreatePage } from './monitor-create.page';

describe('MonitorCreateComponent', () => {
  let component: MonitorCreatePage;
  let fixture: ComponentFixture<MonitorCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorCreatePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
