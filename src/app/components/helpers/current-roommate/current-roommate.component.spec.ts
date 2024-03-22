import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRoommateComponent } from './current-roommate.component';

describe('CurrentRoommateComponent', () => {
  let component: CurrentRoommateComponent;
  let fixture: ComponentFixture<CurrentRoommateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentRoommateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentRoommateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
