import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  const formBuilder: FormBuilder = new FormBuilder();
  const fieldConfig: FieldConfig = {
    name: 'disk',
    type: 'checkbox'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ CheckboxComponent ],
      imports: [ReactiveFormsModule],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    component.config = fieldConfig;
    component.group = formBuilder.group({
      [component.config.name]: '',
      placeholder: '',
      inputType: ''
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should embed root of template', () => {
    let spy = spyOn(component['root'], 'createEmbeddedView');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  })
});
