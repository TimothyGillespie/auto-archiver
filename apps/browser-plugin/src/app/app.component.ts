import {Component} from '@angular/core';

@Component({
  selector: 'auto-archiver-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tab: any;

  constructor() {
    this.getActiveTab();
  }

  getActiveTab() {
    // @ts-ignore
    browser.tabs.query({active: true}).then((tab) => {
      this.tab = tab;
    })[0];
  }
}
