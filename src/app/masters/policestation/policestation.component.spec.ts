import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicestationComponent } from './policestation.component';

describe('PolicestationComponent', () => {
  let component: PolicestationComponent;
  let fixture: ComponentFixture<PolicestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
