import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  timezone: string = null;
  disabled = false;
  placeholderString = 'Choose a timezone';
  onChange(t: string) {
    console.log(t);
  }
  inputChange(e) {
debugger;    
    this.placeholderString = e;
  }
}
