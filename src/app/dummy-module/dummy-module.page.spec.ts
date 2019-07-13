import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyModulePage } from './dummy-module.page';

describe('DummyModulePage', () => {
  let component: DummyModulePage;
  let fixture: ComponentFixture<DummyModulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyModulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyModulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
