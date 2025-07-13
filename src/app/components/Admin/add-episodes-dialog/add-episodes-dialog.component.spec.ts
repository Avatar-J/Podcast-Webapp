import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEpisodesDialogComponent } from './add-episodes-dialog.component';

describe('AddEpisodesDialogComponent', () => {
  let component: AddEpisodesDialogComponent;
  let fixture: ComponentFixture<AddEpisodesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEpisodesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEpisodesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
