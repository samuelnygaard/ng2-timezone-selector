import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimezonePickerModule } from 'ng2-timezone-selector';

import { NgSemanticModule } from 'ng-semantic';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    NgSemanticModule,
    TimezonePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
