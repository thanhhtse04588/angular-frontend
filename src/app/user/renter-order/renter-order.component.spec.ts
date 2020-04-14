/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RenterOrderComponent } from './renter-order.component';

describe('RenterOrderComponent', () => {
  let component: RenterOrderComponent;
  let fixture: ComponentFixture<RenterOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenterOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
