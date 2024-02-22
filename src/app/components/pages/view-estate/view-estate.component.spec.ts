import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEstateComponent } from './view-estate.component';

describe('ViewEstateComponent', () => {
  let component: ViewEstateComponent;
  let fixture: ComponentFixture<ViewEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEstateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
