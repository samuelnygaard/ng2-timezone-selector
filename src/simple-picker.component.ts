import { TimezonePickerService } from './timezone-picker.service';
import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'ng2-timezone-simple-picker',
  template: `
  <mat-form-field style="width:100%">
    <mat-select style="width:100%" [placeholder]="placeholder" [(value)]="_timezone" (selectionChange)="timezoneChange.emit($event.value)">
      <mat-option *ngFor="let z of service.getSimpleZones()" [value]="z.zone">
        {{(showOffset ? service.offsetOfTimezone(z.zone, !useGMT) + ' ' : '') + z.name }}
      </mat-option>
    </mat-select>
  </mat-form-field>`,
  viewProviders: [TimezonePickerService]
})
export class SimeplePickerComponent {
  _timezone: string;
  @Input()
  set timezone(timezone: string) {
    this._timezone = this.service.guessSimpleZone(timezone);
    this.timezoneChange.emit(this._timezone);
  }
  @Output() timezoneChange = new EventEmitter<string>();
  @Input() placeholder = 'Time zone';
  @Input() showOffset = true;
  @Input() guess = true;
  @Input() useGMT = false;

  constructor(public service: TimezonePickerService) {
    if (!this._timezone && this.guess) {
      this._timezone = service.guessSimpleZone();
    }
  }
}