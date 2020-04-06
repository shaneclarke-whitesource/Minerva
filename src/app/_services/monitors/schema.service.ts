import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ajv } from 'ajv';
import { environment } from 'src/environments/environment';
import { LoggingService } from 'src/app/_services/logging/logging.service';
import { LogLevels } from 'src/app/_enums/log-levels.enum';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';
import { ISchema } from 'src/app/_models/monitors';

export const AJV_INSTANCE = new InjectionToken<Ajv>('The AJV Class Instance');

/**
 * The response of a validation result
 */
interface ValidateResult {
  // If the result is valid or not
  isValid: boolean;

  //Error text from the validator
  errorsText: string;
};

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  private _schema: ISchema;
  private mockedMonitors = new monitorsMock();
  get schema(): ISchema {
    return this._schema;
  }

  set schema(scheme: ISchema) {
    this._schema = scheme;
  }
  constructor(private readonly http: HttpClient, @Inject(AJV_INSTANCE) private readonly ajv: Ajv,
  private readonly logService: LoggingService) {

  }

  /**
   * Fetches the Schema and adds it to the validator schema set
   * @param name The name of the schema, this will be used as the key to store it
   * @param urlPath The URL path of the schema to load
  */
  loadSchema(): Promise<ISchema | boolean> {
    return new Promise((res, rej) => {
      if (environment.mock) {
        this._schema = this.mockedMonitors.schema
        res(this.schema);
      }
      else {
        this.http.get<ISchema>(`${environment.api.salus}/schema/monitors`).subscribe(result => {
          result['$id'] = result.$schema;
          delete result.$schema;
          this._schema = result;
          this.ajv.addSchema(result, 'monitor');
          this.logService.log(`Schema: ${result}`, LogLevels.info);
          res(this._schema);
        }, (error) => rej(error));
      };
    });
  }

  /**
   * Validate data against a schema
   * @param data The data to validate
   * @returns ValidateResult
  */
  validateData<T>(data: T): ValidateResult {
    const isValid = this.ajv.validate('monitor', data) as boolean;
    return { isValid, errorsText: this.ajv.errorsText() };
  }
}
