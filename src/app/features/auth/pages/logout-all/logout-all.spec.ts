import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutAll } from './logout-all';

describe('LogoutAll', () => {
  let component: LogoutAll;
  let fixture: ComponentFixture<LogoutAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutAll],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutAll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
