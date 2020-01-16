import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'durationSeconds'
})
export class DurationSecondsPipe implements PipeTransform {
  transform(value: string): number {
    let duration = moment.duration(value);
    return duration.asSeconds();
  }
}
