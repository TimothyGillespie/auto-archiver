import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeWatchComponent } from './youtube-watch.component';

describe('YoutubeWatchComponent', () => {
  let component: YoutubeWatchComponent;
  let fixture: ComponentFixture<YoutubeWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
