/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SimpleTimezonePickerModule } from '../dist';

@Component({
  selector: 'app',
  template: `<ng2-simple-picker></ng2-simple-picker>`
})
class AppComponent {}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, SimpleTimezonePickerModule]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
