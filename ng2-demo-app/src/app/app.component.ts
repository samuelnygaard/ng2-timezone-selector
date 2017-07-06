import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {

  constructor(googleAnalytics: Angulartics2GoogleAnalytics) {
  }
}
