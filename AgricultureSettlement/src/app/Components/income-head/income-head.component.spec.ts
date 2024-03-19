import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeHeadComponent } from './income-head.component';

describe('IncomeHeadComponent', () => {
  let component: IncomeHeadComponent;
  let fixture: ComponentFixture<IncomeHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomeHeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomeHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
