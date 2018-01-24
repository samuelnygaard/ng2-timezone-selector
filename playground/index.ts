/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { TimezonePickerModule } from '../dist';

@Component({
  selector: 'app',
  template: `<ng2-timezone-picker guess="true"></ng2-timezone-picker>`
})
class AppComponent {}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, TimezonePickerModule]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
