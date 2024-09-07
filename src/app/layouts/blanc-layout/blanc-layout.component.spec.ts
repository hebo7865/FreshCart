import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlancLayoutComponent } from './blanc-layout.component';

describe('BlancLayoutComponent', () => {
  let component: BlancLayoutComponent;
  let fixture: ComponentFixture<BlancLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlancLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlancLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
