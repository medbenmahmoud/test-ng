import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleTowComponent } from './example-tow.component';

describe('ExampleTowComponent', () => {
  let component: ExampleTowComponent;
  let fixture: ComponentFixture<ExampleTowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleTowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleTowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
