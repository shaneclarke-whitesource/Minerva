import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FieldConfig, Validator } from "../../interfaces/field.interface";
import { Observable, Subscription } from "rxjs";
import { MarkFormGroupTouched } from "src/app/_shared/utils";

/**
 * DynamicForm Component
 * @Input config example
 * this.config = [
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
 */

@Component({
  selector: 'monitor-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges {

  // input for configs that will build each of the fields
  @Input() config: FieldConfig[] = [];
  // input to notify this component the form is ready to be submitted,
  @Input() validateForm: Observable<void>;
  // output its validity to the parent component
  @Output() formValid: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  subManager = new Subscription();

  get value() {
    let val = this.form.value;
    // we won't return fields with null values
    Object.keys(val).forEach((key) => {
      if (val[key] === null || val[key] === '') { delete val[key] }
    });
    return val;
  }

  constructor(private fb: FormBuilder) { }

  /**
   * @description needed to reinitiate this component & reassign the form
   */
  initiateForm(): void {
    this.form = this.createControl();
    let formValidSub = this.validateForm.subscribe(() => {
      let valid = this.form.valid;
      MarkFormGroupTouched(this.form);
      this.formValid.emit(valid);
    });
    this.subManager.add(formValidSub);
  }

  /**
   * @description loops through config and creates controls
   * @returns FormGroup
   */
  createControl(): FormGroup {
    const group = this.fb.group({});
    this.config.forEach(field => {
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  /**
   * @description Bind any validators associated with the control
   * @param validations any
   * @returns Validator | null
   */
  bindValidations(validations: any): Validators | null {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config) {
      this.initiateForm();
    }
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
}
