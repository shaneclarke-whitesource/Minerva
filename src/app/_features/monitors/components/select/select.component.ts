import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { FieldConfig } from '../../interfaces/field.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'monitor-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  config: FieldConfig;
  group: FormGroup;

  @ViewChild('content', {read: TemplateRef}) actualContentTmpl: TemplateRef<any>;

  constructor(private root: ViewContainerRef) { }

  ngOnInit() {
    // displays the component without wrapping in an element
    this.root.createEmbeddedView(this.actualContentTmpl);
  }
}
