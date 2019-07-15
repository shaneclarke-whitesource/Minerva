import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizePage } from './visualize.page.component';

describe('VisualizePage', () => {
  let component: VisualizePage;
  let fixture: ComponentFixture<VisualizePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
