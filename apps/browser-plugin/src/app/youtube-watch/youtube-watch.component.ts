import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'auto-archiver-youtube-watch',
  templateUrl: './youtube-watch.component.html',
  styleUrls: ['./youtube-watch.component.scss']
})
export class YoutubeWatchComponent implements OnInit {

  archived = false;

  constructor() { }

  ngOnInit(): void {
  }

  sendToServer() {
    this.archived = true;
  }
}
