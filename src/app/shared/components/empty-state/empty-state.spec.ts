import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyStateComponent } from './empty-state';
import { By } from '@angular/platform-browser';

describe('EmptyStateComponent', () => {
  let component: EmptyStateComponent;
  let fixture: ComponentFixture<EmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default title and icon', () => {
    const title = fixture.debugElement.query(By.css('h3')).nativeElement;
    const icon = fixture.debugElement.query(By.css('i')).nativeElement;

    expect(title.textContent).toBe('No data');
    expect(icon.classList).toContain('pi-inbox');
  });

  it('should render custom title and icon', () => {
    fixture.componentRef.setInput('title', 'Custom Title');
    fixture.componentRef.setInput('icon', 'pi-custom');
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h3')).nativeElement;
    const icon = fixture.debugElement.query(By.css('i')).nativeElement;

    expect(title.textContent).toBe('Custom Title');
    expect(icon.classList).toContain('pi-custom');
  });

  it('should render message if provided', () => {
    fixture.componentRef.setInput('message', 'This is a custom message');
    fixture.detectChanges();

    const message = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(message.textContent).toBe('This is a custom message');
  });

  it('should not render message if not provided', () => {
    const message = fixture.debugElement.query(By.css('p'));
    expect(message).toBeNull();
  });
});
