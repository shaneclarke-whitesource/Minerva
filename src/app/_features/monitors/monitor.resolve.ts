import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Schema } from 'src/app/_models/monitors';
import { SchemaService } from 'src/app/_services/monitors/schema.service';
import { of } from 'rxjs';


@Injectable()
export class SchemaResolver implements Resolve<Promise<Schema | boolean>> {
  constructor(private readonly schemaService: SchemaService) {}

  resolve(): Promise<Schema | boolean> {
    return this.schemaService.loadSchema();
  }
}