import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsdiemdanhComponent } from './dsdiemdanh.component';

describe('DsdiemdanhComponent', () => {
  let component: DsdiemdanhComponent;
  let fixture: ComponentFixture<DsdiemdanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsdiemdanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsdiemdanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
