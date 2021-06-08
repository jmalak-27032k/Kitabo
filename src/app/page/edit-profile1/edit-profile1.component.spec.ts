import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfile1Component } from './edit-profile1.component';

describe('EditProfile1Component', () => {
  let component: EditProfile1Component;
  let fixture: ComponentFixture<EditProfile1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfile1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfile1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
