import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfile4Component } from './edit-profile4.component';

describe('EditProfile4Component', () => {
  let component: EditProfile4Component;
  let fixture: ComponentFixture<EditProfile4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfile4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfile4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
