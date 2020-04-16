/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RenterContractComponent } from './renter-contract.component';

describe('RenterContractComponent', () => {
  let component: RenterContractComponent;
  let fixture: ComponentFixture<RenterContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenterContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
