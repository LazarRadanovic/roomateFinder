import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedModalComponent } from './liked-modal.component';

describe('LikedModalComponent', () => {
  let component: LikedModalComponent;
  let fixture: ComponentFixture<LikedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikedModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
