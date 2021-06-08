import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfile3Component } from './edit-profile3.component';

describe('EditProfile3Component', () => {
  let component: EditProfile3Component;
  let fixture: ComponentFixture<EditProfile3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfile3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfile3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
