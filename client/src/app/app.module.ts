import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import http client for api use
import { HttpClientModule } from '@angular/common/http'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzButtonModule, MzInputModule} from 'ng2-materialize';

// Services
import {AuthorizeApiService} from './services/authorize-api.service'

// Components
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MzButtonModule,
    MzInputModule
  ],
  providers: [AuthorizeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
