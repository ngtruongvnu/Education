import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardRequestListComponent } from './tutor-dashboard-request-list.component';

describe('TutorDashboardRequestListComponent', () => {
  let component: TutorDashboardRequestListComponent;
  let fixture: ComponentFixture<TutorDashboardRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
