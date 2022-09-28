import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorRequestDetailComponent } from './tutor-request-detail.component';

describe('TutorRequestDetailComponent', () => {
  let component: TutorRequestDetailComponent;
  let fixture: ComponentFixture<TutorRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorRequestDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
