import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LspromptComponent } from './lsprompt.component';

describe('LspromptComponent', () => {
  let component: LspromptComponent;
  let fixture: ComponentFixture<LspromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LspromptComponent]
    });
    fixture = TestBed.createComponent(LspromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
