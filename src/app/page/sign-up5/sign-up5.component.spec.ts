import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUp5Component } from './sign-up5.component';

describe('SignUp5Component', () => {
  let component: SignUp5Component;
  let fixture: ComponentFixture<SignUp5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUp5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUp5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
