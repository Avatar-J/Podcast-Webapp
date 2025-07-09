import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfessionCardComponent } from './confession-card.component';

describe('ConfessionCardComponent', () => {
  let component: ConfessionCardComponent;
  let fixture: ComponentFixture<ConfessionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfessionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfessionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
