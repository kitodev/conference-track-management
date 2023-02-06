import { ConferenceSchedulerService } from './service/conference';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  providers: [ConferenceSchedulerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
