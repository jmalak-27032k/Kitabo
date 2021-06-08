import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUp6Component } from './sign-up6.component';

describe('SignUp6Component', () => {
  let component: SignUp6Component;
  let fixture: ComponentFixture<SignUp6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUp6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUp6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
