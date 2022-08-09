import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeonameComponent } from './geoname.component';

describe('GeonameComponent', () => {
  let component: GeonameComponent;
  let fixture: ComponentFixture<GeonameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeonameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeonameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
