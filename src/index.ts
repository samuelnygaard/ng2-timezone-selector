import { CountryPickerComponent } from './country-picker.component';
import { TimezonePickerService } from './timezone-picker.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimezonePickerComponent } from './timezone-picker.component';
import { TimezonePickerPipe } from './timezone-picker.pipe';
import { TimezoneNamePipe } from './timezone-name.pipe';
import { SimeplePickerComponent } from 'simple-picker.component';
import { MatSelectModule } from '@angular/material';

export * from './country-picker.component';
export * from './timezone-picker.component';
export * from './simple-picker.component';
export * from './timezone-picker.pipe';
export * from './timezone-name.pipe';
export * from './timezone-picker.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ TimezonePickerPipe, TimezoneNamePipe],
  providers: [TimezonePickerService],
  exports: [ TimezonePickerPipe, TimezoneNamePipe]
})
export class TimezonePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TimezonePickerModule,
      providers: [TimezonePickerService, TimezonePickerPipe, TimezoneNamePipe]
    };
  }
}

@NgModule({
  imports: [CommonModule, MatSelectModule],
  declarations: [SimeplePickerComponent, TimezoneNamePipe],
  exports: [SimeplePickerComponent, TimezoneNamePipe]
})
export class SimpleTimezonePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SimpleTimezonePickerModule
    };
  }
}

