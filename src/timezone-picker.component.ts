import { TimezonePickerService, Timezone } from './timezone-picker.service';
import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';
import * as moment from 'moment-timezone';
import $ from 'jquery';
import 'select2';

@Component({
  selector: 'ng2-timezone-picker',
  template: `
  <select #select id="select" style="width: 100%" class="form-control" [disabled]="disabled">
    <option></option>
    <ng-template let-c ngFor [ngForOf]="allTimezones">
      <optgroup *ngIf="c.zones.length > 1" [label]="getCountryName(c.iso)">
        <option *ngFor="let t of c.zones" [value]="t">{{getCountryName(c.iso)}} - {{formatTimezoneString(t)}}
            <span *ngIf="showOffset">{{offsetOfTimezone(t)}}</span>
        </option>
      </optgroup>
        <option *ngIf="c.zones.length === 1" [value]="c.zones[0]">{{getCountryName(c.iso)}}
          <span *ngIf="showOffset">{{offsetOfTimezone(c.zones[0])}}</span>
      </option>
    </ng-template>
  </select>
  `,
  viewProviders: [TimezonePickerService]
})
export class TimezonePickerComponent implements AfterViewInit {
  /**
   * all time zones combined in one array, for each country
   */
  allTimezones: Timezone[];
  /**
   * ElementRef for the select element
   */
  @ViewChild('select') select: ElementRef;

  /**
   * Input (optional) bound to [allowClear]
   */
  @Input() allowClear = false;

  @Input() showOffset = false;

  @Input() guess = false;

  /**
   * Input (optional) bound to [disabled]
   */
  @Input() disabled = false;

  placeholderString = 'Select timezone';

  /**
   * Input (optional) bound to [placeholder]
   */
  @Input()
  set placeholder(placeholder: string) {
    if (placeholder) {
      this.placeholderString = placeholder;
      const placeholderElem = $(this.select.nativeElement.parentElement).find(
        '.select2-selection__placeholder'
      );
      if (placeholderElem.length > 0) {
        placeholderElem[0].innerText = placeholder;
      }
    }
  }

  /**
   * The current selected timezone.
   */
  currentTimezone: string;
  /**
   * Input: string (required) bound to [timezone]
   */
  @Input()
  set timezone(timezone: string) {
    if (timezone) {
      this.currentTimezone = timezone;
      this.triggerChangeEvent();
    } else if (this.guess) {
      this.currentTimezone = moment.tz.guess();
      this.triggerChangeEvent();
    }
  }

  @Input()
  set country(isoCode: string) {
    if (isoCode && !this.currentTimezone && !this.guess) {
      const res = this.allTimezones.find(x => x.iso === isoCode);
      if (res) {
        this.currentTimezone = res.zones[0];
        this.triggerChangeEvent();
      }
    }
  }

  /**
   * Output event bound to (timezone)
   */
  @Output() timezoneChange = new EventEmitter<string>();

  /**
   * Output event bound to (change)
   */
  @Output() change = new EventEmitter<string>();
  @Output() countryChange = new EventEmitter<string>();

  /**
   * Contructor function to define all the timezones
   */
  constructor(public service: TimezonePickerService) {
    this.allTimezones = service.getZones();
  }

  /**
   * $ bounding of select2 framework in the selectElement
   */
  ngAfterViewInit() {
    const selectElement = $(this.select.nativeElement);

    selectElement.select2({
      placeholder: this.placeholderString,
      allowClear: this.allowClear,
      matcher: (term, text) => this.matcher(term, text)
    });

    if (this.currentTimezone) {
      $(selectElement)
        .val(this.currentTimezone)
        .trigger('change');
    }

    selectElement.on('change', (e: any) => {
      this.onChange($(e.target).val());
    });
  }

  private triggerChangeEvent(): void {
    $(this.select.nativeElement)
      .val(this.currentTimezone)
      .trigger('change');
    this.timezoneChange.emit(this.currentTimezone);
    this.change.emit(this.currentTimezone);
    this.countryChange.emit(
      this.allTimezones.find(x => x.zones.indexOf(this.currentTimezone) >= 0)
        .iso
    );
  }

  getCountryName(iso: string): string {
    return this.service.iso2country(iso);
  }

  formatTimezoneString(zone: string): string {
    const arr = zone.split('/');
    return arr[arr.length - 1].replace('_', ' ');
  }

  offsetOfTimezone(zone: string): string {
    let offset = moment.tz(zone).utcOffset();
    const neg = offset < 0;
    if (neg) {
      offset = -1 * offset;
    }
    const hours = Math.floor(offset / 60);
    const minutes = (offset / 60 - hours) * 60;
    return `(GMT${neg ? '-' : '+'}${this.rjust(
      hours.toString(),
      2
    )}:${this.rjust(minutes.toString(), 2)})`;
  }

  /**
   * onChange function called by the "select" element
   * @param timezone The timezone string selected
   */
  private onChange(timezone) {
    this.currentTimezone = timezone;
    this.timezoneChange.emit(timezone);
    this.change.emit(timezone);
  }

  /**
   * Matcher function to search in the select options
   * @param params contains the search term
   * @param data contains the data of each row
   */
  private matcher(params, data) {
    // Always return the object if there is nothing to compare
    if ($.trim(params.term) === '') {
      return data;
    }

    let original = data.text.toUpperCase();
    const term = params.term.toUpperCase();

    // Replace '_' with ' ' to be able to search for 'New York'
    if (original.indexOf('_') !== -1) {
      original += original.replace('_', ' ');
    }

    // Check if the text contains the term
    if (original.indexOf(term) > -1) {
      return data;
    }

    // Do a recursive check for options with children
    if (data.children && data.children.length > 0) {
      // Clone the data object if there are children
      // This is required as we modify the object to remove any non-matches
      const match = $.extend(true, {}, data);
      // Check each child of the option
      for (let c = data.children.length - 1; c >= 0; c--) {
        const child = data.children[c];
        const matches = this.matcher(params, child);
        // If there wasn't a match, remove the object in the array
        if (matches == null) {
          match.children.splice(c, 1);
        }
      }
      // If any children matched, return the new object
      if (match.children.length > 0) {
        return match;
      }
      // If there were no matching children, check just the plain object
      return this.matcher(params, match);
    }
    // If it doesn't contain the term, don't return anything
    return null;
  }

  private rjust(string: string, width: number, padding = '0'): string {
    padding = padding || ' ';
    padding = padding.substr(0, 1);
    if (string.length < width) {
      return padding.repeat(width - string.length) + string;
    } else {
      return string;
    }
  }
}
