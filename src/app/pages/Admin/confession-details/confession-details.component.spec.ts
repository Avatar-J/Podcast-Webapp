import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfessionDetailsComponent } from './confession-details.component';

describe('ConfessionDetailsComponent', () => {
  let component: ConfessionDetailsComponent;
  let fixture: ComponentFixture<ConfessionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfessionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfessionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
