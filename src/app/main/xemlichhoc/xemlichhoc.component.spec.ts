import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XemlichhocComponent } from './xemlichhoc.component';

describe('XemlichhocComponent', () => {
  let component: XemlichhocComponent;
  let fixture: ComponentFixture<XemlichhocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XemlichhocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XemlichhocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
