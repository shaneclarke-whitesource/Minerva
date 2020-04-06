import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ISchema } from 'src/app/_models/monitors';
import { SchemaService } from 'src/app/_services/monitors/schema.service';
import { of } from 'rxjs';


@Injectable()
export class SchemaResolver implements Resolve<Promise<ISchema | boolean>> {
  constructor(private readonly schemaService: SchemaService) {}

  resolve(): Promise<ISchema | boolean> {
    return this.schemaService.loadSchema();
  }
}