import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldDirective } from '../dynamic-field/dynamic-field.directive';
import { InputComponent } from '../input/input.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { SelectComponent } from '../select/select.component';
import  * as markedGroup from "src/app/_shared/utils";

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let formValidSub: Subject<void> = new Subject<void>();


  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
      declarations: [
        DynamicFormComponent,
        DynamicFieldDirective,
        InputComponent,
        CheckboxComponent,
        SelectComponent
  ]}) // overrideModule for adding entryComponents to Testbed
  .overrideModule(BrowserDynamicTestingModule, {
    set: {
      entryComponents: [
        InputComponent,
        CheckboxComponent,
        SelectComponent
      ]
    }
  }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.form = formBuilder.group({});
    component.validateForm = formValidSub.asObservable();
    component.config = [
      {
        type: "input",
        label: "Username",
        inputType: "text",
        name: "name",
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Name Required"
          },
          {
            name: "pattern",
            validator: Validators.pattern("^[a-zA-Z]+$"),
            message: "Accept only text"
          }
        ]
      },
      {
        type: "checkbox",
        label: "Accept Terms",
        name: "term",
        value: true
      },
      {
        type: "select",
        label: "Country",
        name: "country",
        value: "UK",
        options: ["India", "UAE", "UK", "US"]
      }
    ];
    component.initiateForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form value', () => {
    expect(JSON.stringify(component.value)).toEqual('{"term":true,"country":"UK"}');
  });

  it('should add 1 subscriptions to subManager', () => {
    let spy = spyOn(component.subManager, 'add');
    component.initiateForm();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should add controls to formgroup', () => {
    expect(Object.keys(component.form.controls).length).toEqual(3);
  });

  it('should expect validators to be added to controls', () => {
    let control = component.form.controls['name'];
    expect(control.validator).toBeDefined();
  });

  it('should execute ngOnChanges and initiateForm()', () => {
    let spy = spyOn(component, 'initiateForm');
    component.ngOnChanges({
      config: new SimpleChange(null, [{type: "checkbox", label: "percpu", name: "percpu"},
      {type: "checkbox", label: "totalcpu", name: "totalcpu", value: true},
      {type: "checkbox", label: "collectCpuTime", name: "collectCpuTime"},
      {type: "checkbox", label: "reportActive", name: "reportActive"}], true)
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should unsubscribe once component is destroyed', () => {
    let spy = spyOn(component.subManager, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
