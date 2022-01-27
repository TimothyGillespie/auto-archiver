import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { YoutubeWatchComponent } from './youtube-watch/youtube-watch.component';
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [AppComponent, YoutubeWatchComponent],
  imports: [
    BrowserModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
