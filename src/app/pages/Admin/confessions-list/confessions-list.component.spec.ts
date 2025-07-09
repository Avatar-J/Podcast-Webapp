import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfessionsListComponent } from './confessions-list.component';

describe('ConfessionsListComponent', () => {
  let component: ConfessionsListComponent;
  let fixture: ComponentFixture<ConfessionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfessionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfessionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
