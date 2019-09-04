import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../../_shared/shared.module';

import { SelectionsComponent } from './selections.component';

describe('SelectionsComponent', () => {
  let component: SelectionsComponent;
  let fixture: ComponentFixture<SelectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ SelectionsComponent ],
      imports: [
        HttpClientModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter measurements based on selected system', () => {

  });

  it('should add all subscriptions', () => {

  });

  it('should select a system', () => {

  });

  it('should select a measurement', () => {

  });

  it('should select a device', () => {

  });

  it('should destroy subscriptions', () => {

  });

});
