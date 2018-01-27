# ng2-timezone-selector

A simple Angular module to create a timezone selector using [moment-timezones](https://github.com/moment/moment-timezone).

## [Demo](https://samuelnygaard.github.io/ng2-timezone-selector/) | [Documentation](https://samuelnygaard.github.io/ng2-timezone-selector/docs/)

## New features (0.2.3)

* Guess the timezone based on browser settings, usage:
  * `<ng2-timezone-picker [(timezone)]="timezone" guess="true"></ng2-timezone-picker>`
* Show GMT offset (equivalent with UTC offset), e.g.: `Denmark (GTM+01:00)`, usage:
  * `<ng2-timezone-picker [(timezone)]="timezone" showOffset="true"></ng2-timezone-picker>`
* Select timezone based on country iso code and outputs country iso code based on timezone, usage:
  * `<ng2-timezone-picker [(timezone)]="timezone" [(country)]="countryIsoCode"></ng2-timezone-picker>`

## Installation

To install this library, run:

```bash
$ npm install ng2-timezone-selector --save
```

### Requirements (IMPORTANT, use one of the following methods)

The library depent on [jQuery](https://github.com/jquery/jquery) and [select2](https://github.com/select2/select2) and [moment-timezone](https://github.com/moment/moment-timezone)

The only file required is the select2 `select2.min.css` file:

#### 1. Method (should work for all)

Include the `select2.min.css` file in the `angular-cli.json` file (remember to re-run `ng serve`, after editing `angular-cli.json`):

```json
{
  "project": {
    ...
  },
  "apps": [
    {
      ...
      "styles": [
        "styles.scss",
        "../node_modules/select2/dist/css/select2.min.css"
      ],
      ...
    }
```

#### 2. Method (simplest)

If the angular project is setup to use `*.scss` instead of `*.css`, then you can add the following `@import` to the default `*.scss` file, othen called: `styles.scss`:

```scss
@import '~select2/dist/css/select2.min.css';
```

#### 3. Method (HTML-link)

Include the `css` resource from a CDN link in the `index.html` file:

```xml
<head>
  ...
  <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
  ...
</head>
```

### Importing

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
<!-- You can now use the library component
 in app.component.html with double-binding: -->
<ng2-timezone-picker
    [(timezone)]="user.timezone"
    [placeholder]="placeholderString">
</ng2-timezone-picker>
```

```xml
<!-- You can now use the library component in
 app.component.html or with single-binding and a change function  -->
<ng2-timezone-picker
    [timezone]="user.timezone"
    (change)="changeTimezone($event)"
    placeholder="Select timezone"
    showOffset="true"
    guess="true">
</ng2-timezone-picker>
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

* `timezone: string` - Required: must be defined. The timezone string. If you are using the Two-Way Data Binding `[(timezone)]="timezoneString"` it will change on selection of timezone.
* `placeholder: string` - Optional: default = `''`. The placeholder string to show when no timezone is selected.
* `disabled: boolean` - Optional: default = `false`. Disable the the component.
* `showOffset: boolean` - Optional: default = `false`. Condition to show GMT offset in the dropdown.
* `guess: boolean` - Optional: default = `false`. If set to `true` and if the `timezone` parameters is `null` or `undefined` then guesses the users timezone.
* `country: string` - Optional. The country iso-string (e.g. `'US'` / `'GB'` / `'AU'`). If you are using the Two-Way Data Binding e.g.: `[(country)]="countryIsoCode"` it will change the timezone to the provided iso-code (if the iso code is valid), and if the timezone is changed it changes the value of `countryIsoCode` to the iso of the country.
* `allowClear: boolean` - Optional: default = `false`. Enabled you to clear the selection of a timezone.

You can configure component with the `(change)="changeFunction($event)` or `(countryChange)="countryIsoCode = $event` output attributes:

* `change: function($event)` - Trigger-function when timezone is selected or changed, the `$event` parameter is the timezone string.
* `countryChange: function($event: string)` - Trigger-function when timezone is changed, the `$event` parameter is the country iso-code.

## License

MIT © [Samuel Nygaard](mailto:teamnygaard@gmail.com)
