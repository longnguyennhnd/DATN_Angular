import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsdiemdanhngayComponent } from './dsdiemdanhngay.component';

describe('DsdiemdanhngayComponent', () => {
  let component: DsdiemdanhngayComponent;
  let fixture: ComponentFixture<DsdiemdanhngayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsdiemdanhngayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsdiemdanhngayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
