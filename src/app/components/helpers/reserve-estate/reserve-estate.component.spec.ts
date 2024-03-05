import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveEstateComponent } from './reserve-estate.component';

describe('ReserveEstateComponent', () => {
  let component: ReserveEstateComponent;
  let fixture: ComponentFixture<ReserveEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveEstateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReserveEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
