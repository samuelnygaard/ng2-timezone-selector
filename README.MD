# ng2-timezone-selector

## Installation

To install this library, run:

```bash
$ npm install ng2-timezone-selector --save
```

The library depent on [jQuery](https://github.com/jquery/jquery) and [Select2](https://github.com/select2/select2)

```xml
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  ...
  <!-- You will need to include the following libraries -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
  ...
</head>
```

Import the module in `app.module.ts`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the library
import { TimezonePickerModule } from 'ng2-timezone-selector';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ...,
    // Include the library in the imports section
    TimezonePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Usage

Once the library is imported, you can use the component in your Angular application:

```xml
<!-- You can now use the library component in app.component.html with double-binding: -->
<ng2-timezone-picker [(timezone)]="user.timezone" [placeholder]="placeholderString"></ng2-timezone-picker>
```

```xml
<!-- You can now use the library component in app.component.html or with single-binding and a change function  -->
<ng2-timezone-picker [timezone]="user.timezone" (change)="changeTimezone($event)" placeholder="Select timezone"></ng2-timezone-picker>
```

```typescript
// Example of usage in app.component.ts:
user = {};
placeholderString = 'Select timezone';

changeTimezone(timezone) {
  this.user.timezone = timezone;
}
```

## Parameters

### Component configuration

You can configure component with the following input attributes:

  * `timezone: string` - Required: must be defined (but can be null). The timezone string. If you are using the Two-Way Data Binding `[(timezone)]="timezoneString"` it will change on selection of timezone. 
  * `placeholder: string` - Optional: default = `''`. The placeholder string to show when no timezone is selected.
  * `disabled: boolean` - Optional: default = `false`. Disable the the component.
  * `allowClear: boolean` - Optional: default = `false`. Enabled you to clear the selection of a timezone.

You can configure component with the `(change)="changeFunction($event)` output attributes:
  * `change: function($event: string)` - Trigger-function when timezone is selected or changed, the `$event` parameter is the timezone string.

## License

MIT © [Samuel Nygaard](mailto:teamnygaard@gmail.com)