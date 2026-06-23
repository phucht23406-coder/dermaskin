import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiConsult } from './ai-consult';

describe('AiConsult', () => {
  let component: AiConsult;
  let fixture: ComponentFixture<AiConsult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiConsult],
    }).compileComponents();

    fixture = TestBed.createComponent(AiConsult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
