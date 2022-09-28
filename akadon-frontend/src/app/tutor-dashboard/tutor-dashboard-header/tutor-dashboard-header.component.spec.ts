import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardHeaderComponent } from './tutor-dashboard-header.component';

describe('TutorDashboardHeaderComponent', () => {
  let component: TutorDashboardHeaderComponent;
  let fixture: ComponentFixture<TutorDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
