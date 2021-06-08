import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUp4Component } from './sign-up4.component';

describe('SignUp4Component', () => {
  let component: SignUp4Component;
  let fixture: ComponentFixture<SignUp4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUp4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUp4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
