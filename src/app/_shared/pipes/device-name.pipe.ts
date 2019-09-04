import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceName'
})
export class DeviceNamePipe implements PipeTransform {
  transform(value: string): string {
    let replaced = value.replace(/"/g, '');
    return replaced;
  }
}
