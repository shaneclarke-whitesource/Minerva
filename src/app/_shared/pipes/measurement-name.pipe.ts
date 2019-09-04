import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'measurementName'
})
export class MeasurementNamePipe implements PipeTransform {
  transform(value: string): any {
    let split = value.substring(value.indexOf('_') + 1);
    return split;
  }
}
