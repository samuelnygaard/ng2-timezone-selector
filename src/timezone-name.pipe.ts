import { Injectable, PipeTransform, Pipe } from '@angular/core';
import { TimezonePickerService } from './timezone-picker.service';

/**
 * Transforms any input value
 */
@Pipe({
  name: 'zoneToName'
})
@Injectable()
export class TimezoneNamePipe implements PipeTransform {
  constructor(private service: TimezonePickerService) {}
  transform(value: string): string {
    return this.service.simpleZoneToName(value);
  }
}
