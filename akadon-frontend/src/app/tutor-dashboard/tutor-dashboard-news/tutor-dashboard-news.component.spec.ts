import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardNewsComponent } from './tutor-dashboard-news.component';

describe('TutorDashboardNewsComponent', () => {
  let component: TutorDashboardNewsComponent;
  let fixture: ComponentFixture<TutorDashboardNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
