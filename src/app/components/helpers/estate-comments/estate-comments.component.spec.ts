import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateCommentsComponent } from './estate-comments.component';

describe('EstateCommentsComponent', () => {
  let component: EstateCommentsComponent;
  let fixture: ComponentFixture<EstateCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstateCommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstateCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
