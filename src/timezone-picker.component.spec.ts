import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimezonePickerComponent } from './timezone-picker.component';

describe('TimezonePickerComponent', () => {
  let comp: TimezonePickerComponent;
  let fixture: ComponentFixture<TimezonePickerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimezonePickerComponent] // declare the test component
    });

    fixture = TestBed.createComponent(TimezonePickerComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('Should be false', () => {
    expect(false).toBe(true);
  });
});
