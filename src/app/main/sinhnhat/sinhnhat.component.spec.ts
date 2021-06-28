import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinhnhatComponent } from './sinhnhat.component';

describe('SinhnhatComponent', () => {
  let component: SinhnhatComponent;
  let fixture: ComponentFixture<SinhnhatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinhnhatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinhnhatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
