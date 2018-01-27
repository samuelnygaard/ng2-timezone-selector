import { TimezonePickerService } from './timezone-picker.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimezonePickerComponent } from './timezone-picker.component';
import { TimezonePickerPipe } from './timezone-picker.pipe';

export * from './timezone-picker.component';
export * from './timezone-picker.pipe';
export * from './timezone-picker.service';

@NgModule({
  imports: [CommonModule],
  declarations: [TimezonePickerComponent, TimezonePickerPipe],
  providers: [TimezonePickerService],
  exports: [TimezonePickerComponent, TimezonePickerPipe]
})
export class TimezonePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TimezonePickerModule,
      providers: [TimezonePickerService]
    };
  }
}
