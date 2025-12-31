import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeaderComponent } from './page-header';
import { By } from '@angular/platform-browser';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.textContent).toBe('Test Title');
  });

  it('should update title', () => {
    fixture.componentRef.setInput('title', 'New Title');
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.textContent).toBe('New Title');
  });

  it('should render description if provided', () => {
    fixture.componentRef.setInput('description', 'Test Description');
    fixture.detectChanges();
    const description = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(description.textContent).toBe('Test Description');
  });

  it('should not render description if not provided', () => {
    const description = fixture.debugElement.query(By.css('p'));
    expect(description).toBeNull();
  });
});
