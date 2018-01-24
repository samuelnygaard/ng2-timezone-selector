import { TimezonePickerService } from './timezone-picker.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimezonePickerComponent } from './timezone-picker.component';

export * from './timezone-picker.component';
export * from './timezone-picker.service';

@NgModule({
  imports: [CommonModule],
  declarations: [TimezonePickerComponent],
  exports: [TimezonePickerComponent]
})
export class TimezonePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TimezonePickerModule,
      providers: [TimezonePickerService]
    };
  }
}
