import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSidebarCustom } from './right-sidebar-custom';

describe('RightSidebarCustom', () => {
  let component: RightSidebarCustom;
  let fixture: ComponentFixture<RightSidebarCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightSidebarCustom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightSidebarCustom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
