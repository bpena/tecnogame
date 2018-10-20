import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform {
    times = {
        year: 31557600,
        month: 2629746,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    }

    transform(seconds: any): any {
        let time_string: string = '';
        let temporalTime: number;
        let plural: string = '';
        for (var key in this.times) {
            if (Math.floor(seconds / this.times[key]) > 0 || key === 'second') {
                temporalTime = Math.floor(seconds / this.times[key]);
                time_string +=  (temporalTime < 10 ? '0': '') + temporalTime.toString() + ((key !== 'second') ? ':' : '');
                seconds = seconds - this.times[key] * Math.floor(seconds / this.times[key]);
            }
        }
        return time_string;
    }

}
