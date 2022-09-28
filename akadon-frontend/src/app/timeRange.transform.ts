import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeRangeTransform' })
export class TimeRangeTransform implements PipeTransform {
  transform(value: any): string {
    var now = new Date();
    var time = new Date(value);
    var diffMs = now.valueOf() - time.valueOf();
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (diffDays < 1) {
      if (diffHrs < 1) {
        return diffMins + ' phút trước';
      } else {
        return diffHrs + ' giờ trước';
      }
    } else if (diffDays < 3) {
      return diffDays + ' ngày trước';
    } else if (diffMins > 0) {
      return (
        time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear()
      );
    } else {
      return 'Vài giây trước';
    }
  }
}
