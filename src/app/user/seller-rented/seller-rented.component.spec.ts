/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellerRentedComponent } from './seller-rented.component';

describe('SellerRentedComponent', () => {
  let component: SellerRentedComponent;
  let fixture: ComponentFixture<SellerRentedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerRentedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerRentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
