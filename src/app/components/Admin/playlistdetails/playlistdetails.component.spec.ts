import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistdetailsComponent } from './playlistdetails.component';

describe('PlaylistdetailsComponent', () => {
  let component: PlaylistdetailsComponent;
  let fixture: ComponentFixture<PlaylistdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
