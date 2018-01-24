import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  TimezonePickerModule,
  TimezonePickerService
} from 'ng2-timezone-selector';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, TimezonePickerModule],
  providers: [TimezonePickerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
