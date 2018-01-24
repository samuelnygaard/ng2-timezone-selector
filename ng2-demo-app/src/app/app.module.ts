import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
// import { TimezonePickerModule } from '../../../../ng2-timezone-selector/dist';
import {
  TimezonePickerModule,
  TimezonePickerService
} from 'ng2-timezone-selector';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule
    // Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    // TimezonePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
