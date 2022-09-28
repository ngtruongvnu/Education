import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorChatAreaComponent } from './tutor-chat-area.component';

describe('TutorChatAreaComponent', () => {
  let component: TutorChatAreaComponent;
  let fixture: ComponentFixture<TutorChatAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorChatAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorChatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
