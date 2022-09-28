import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeTransform' })
export class TimeTransform implements PipeTransform {
  transform(value: any): string {
    let hour = value.toString().slice(0, 1);
    let minute = value.toString().slice(2, 3);
    if (minute === '5') {
      return hour + ' tiếng ' + '30 phút';
    } else {
      return hour + ' tiếng ';
    }
  }
}
