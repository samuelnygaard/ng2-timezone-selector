import { Component } from '@angular/core';
import { TimezonePickerService } from 'ng2-timezone-selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  country;
  timezone: string = null;
  timezone1: string = null;
  disabled = false;
  disabledOffset = false;
  placeholderString = 'Choose a timezone';

  constructor() {}

  onChange(t: string) {
    console.log(t);
  }
  inputChange(e) {
    this.placeholderString = e;
  }
}
