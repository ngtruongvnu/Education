import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'learningDateTransform' })
export class LearningDateTransform implements PipeTransform {
  transform(value: any): string {
    value = value.substring(0, value.length - 1);
    var ld = value.split('$');
    value = '';
    for (let date of ld) {
      value += date + ', ';
    }
    value = value.substring(0, value.length - 2);
    return value;
  }
}
