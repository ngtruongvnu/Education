import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChatAreaComponent } from './student-chat-area.component';

describe('StudentChatAreaComponent', () => {
  let component: StudentChatAreaComponent;
  let fixture: ComponentFixture<StudentChatAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentChatAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentChatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
