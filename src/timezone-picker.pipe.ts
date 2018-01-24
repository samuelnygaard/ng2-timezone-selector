import { Injectable, PipeTransform, Pipe } from '@angular/core';
import { TimezonePickerService } from './timezone-picker.service';

/**
 * Transforms any input value
 */
@Pipe({
  name: 'iso2CountryPipe'
})
@Injectable()
export class TimezonePickerPipe implements PipeTransform {
  constructor(private service: TimezonePickerService) {}
  transform(value: string): string {
    return this.service.iso2country(value);
    // return countryList[value] ? countryList[value] : value;
  }
}
