/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CostLivingComponent } from './cost-living.component';

describe('CostLivingComponent', () => {
  let component: CostLivingComponent;
  let fixture: ComponentFixture<CostLivingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostLivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostLivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
