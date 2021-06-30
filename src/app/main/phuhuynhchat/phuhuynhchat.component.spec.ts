import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuhuynhchatComponent } from './phuhuynhchat.component';

describe('PhuhuynhchatComponent', () => {
  let component: PhuhuynhchatComponent;
  let fixture: ComponentFixture<PhuhuynhchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhuhuynhchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhuhuynhchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
