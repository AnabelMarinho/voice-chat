import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDousuarios } from './chat-dousuarios';

describe('ChatDousuarios', () => {
  let component: ChatDousuarios;
  let fixture: ComponentFixture<ChatDousuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatDousuarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatDousuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
