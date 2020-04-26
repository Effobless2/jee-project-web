import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerFormularComponent } from './beer-formular.component';

describe('BeerFormularComponent', () => {
  let component: BeerFormularComponent;
  let fixture: ComponentFixture<BeerFormularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerFormularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
