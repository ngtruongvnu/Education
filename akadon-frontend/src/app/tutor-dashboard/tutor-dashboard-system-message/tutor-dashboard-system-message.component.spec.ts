import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardSystemMessageComponent } from './tutor-dashboard-system-message.component';

describe('TutorDashboardSystemMessageComponent', () => {
  let component: TutorDashboardSystemMessageComponent;
  let fixture: ComponentFixture<TutorDashboardSystemMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardSystemMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardSystemMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
