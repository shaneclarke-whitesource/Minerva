import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { FieldConfig } from '../../interfaces/field.interface';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'monitor-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  config: FieldConfig;
  group: FormGroup;

  @ViewChild('content', { read: TemplateRef, static: true }) actualContentTmpl: TemplateRef<any>;

  constructor(private root: ViewContainerRef) { }

  ngOnInit() {
    // displays the component without wrapping in an element
    this.root.createEmbeddedView(this.actualContentTmpl);

  }

  onChanged(prop, eve) {
    let control = this.group.get(prop.name) as FormControl;
    control.patchValue(eve.checked);
  }
}
