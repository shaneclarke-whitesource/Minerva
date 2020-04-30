import { Component, OnInit, TemplateRef, ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../interfaces/field.interface";

@Component({
  selector: 'monitor-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  config: FieldConfig;
  group: FormGroup;

  @ViewChild('content', { read: TemplateRef, static: true }) actualContentTmpl: TemplateRef<any>;

  constructor(private root: ViewContainerRef) { }

  ngOnInit() {
    // displays the component without wrapping in an element
    this.root.createEmbeddedView(this.actualContentTmpl);
  }
}
