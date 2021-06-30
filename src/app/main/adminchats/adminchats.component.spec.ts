import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminchatsComponent } from './adminchats.component';

describe('AdminchatsComponent', () => {
  let component: AdminchatsComponent;
  let fixture: ComponentFixture<AdminchatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminchatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
