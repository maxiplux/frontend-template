import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorConfigComponent } from './color-config.component';
import { ColorConfigService } from '../../services/color-config.service';
import { ThemeEngineService } from '../../services/theme-engine.service';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ColorConfigComponent', () => {
  let component: ColorConfigComponent;
  let fixture: ComponentFixture<ColorConfigComponent>;
  let colorConfigServiceMock: any;

  beforeEach(async () => {
    colorConfigServiceMock = {
      config: signal({
        light: { primary: '#000', surface: '#000', text: '#000', muted: '#000', border: '#000' },
        dark: { primary: '#000', surface: '#000', text: '#000', muted: '#000', border: '#000' }
      }),
      updateColor: vi.fn(),
      resetToDefaults: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ColorConfigComponent],
      providers: [
        { provide: ColorConfigService, useValue: colorConfigServiceMock },
        { provide: ThemeEngineService, useValue: { someEngineProperty: true } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render color pickers for light and dark modes', () => {
    const panels = fixture.debugElement.queryAll(By.css('.theme-panel'));
    expect(panels.length).toBe(2);
  });

  it('should call updateColor when a color is changed', () => {
    // This is a simplified test, real interaction with PrimeNG ColorPicker might be harder to mock
    component.onColorChange('light', 'primary', '#ffffff');
    expect(colorConfigServiceMock.updateColor).toHaveBeenCalledWith('light', 'primary', '#ffffff');
  });

  it('should call resetToDefaults when reset button is clicked', () => {
    const resetButton = fixture.debugElement.query(By.css('button.reset-btn')).nativeElement;
    resetButton.click();
    expect(colorConfigServiceMock.resetToDefaults).toHaveBeenCalled();
  });
});
