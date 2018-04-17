import { TimezonePickerService } from './timezone-picker.service';
import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';
import $ from 'jquery';
import 'select2';
import { TimezonePickerPipe } from './timezone-picker.pipe';

@Component({
  selector: 'ng2-country-picker',
  template: `
  <select #select id="select" style="width: 100%" class="form-control" [disabled]="disabled">
    <option></option>
    <option *ngFor="let c of countries" [value]="c">{{c | iso2CountryPipe}}</option>
  </select>`
})
export class CountryPickerComponent implements AfterViewInit {
  /**
   * all time zones combined in one array, for each country
   */
  countries: string[];
  /**
   * ElementRef for the select element
   */
  @ViewChild('select') select: ElementRef;

  /**
   * Input (optional) bound to [allowClear]
   */
  @Input() allowClear = false;

  /**
   * Input (optional) bound to [disabled]
   */
  @Input() disabled = false;

  placeholderString = 'Select country';

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
  currentCountry: string;
  /**
   * Input: string (required) bound to [timezone]
   */
  @Input()
  set country(country: string) {
    if (country) {
      this.currentCountry = country;
      this.triggerChangeEvent();
    }
  }

  /**
   * Output event bound to (timezone)
   */
  @Output() countryChange = new EventEmitter<string>();
  @Output() countryNameChange = new EventEmitter<string>();

  /**
   * Output event bound to (change)
   */
  @Output() change = new EventEmitter<string>();

  /**
   * Contructor function to define all the timezones
   */
  constructor(
    public service: TimezonePickerService,
    private countryPipe: TimezonePickerPipe
  ) {
    this.countries = service.getCountries();
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

    if (this.currentCountry) {
      $(selectElement)
        .val(this.currentCountry)
        .trigger('change');
    }

    selectElement.on('change', (e: any) => {
      this.onChange($(e.target).val());
    });
  }

  private triggerChangeEvent(): void {
    $(this.select.nativeElement)
      .val(this.currentCountry)
      .trigger('change');
    this.countryChange.emit(this.currentCountry);
    this.countryNameChange.emit(
      this.countryPipe.transform(this.currentCountry)
    );
    this.change.emit(this.currentCountry);
  }

  /**
   * onChange function called by the "select" element
   * @param timezone The timezone string selected
   */
  private onChange(timezone) {
    this.currentCountry = timezone;
    this.countryChange.emit(timezone);
    this.countryNameChange.emit(
      this.countryPipe.transform(this.currentCountry)
    );
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
