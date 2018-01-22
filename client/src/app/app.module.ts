import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzButtonModule, MzInputModule} from 'ng2-materialize';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MzButtonModule,
    MzInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
