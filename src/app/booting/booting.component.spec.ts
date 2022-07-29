import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootingComponent } from './booting.component';

describe('BootingComponent', () => {
  let component: BootingComponent;
  let fixture: ComponentFixture<BootingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BootingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
