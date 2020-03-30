import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacePostComponent } from './place-post.component';

describe('PlacePostComponent', () => {
  let component: PlacePostComponent;
  let fixture: ComponentFixture<PlacePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
