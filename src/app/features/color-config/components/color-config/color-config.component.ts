import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorConfigService, ColorPalette } from '../../services/color-config.service';
import { ThemeEngineService } from '../../services/theme-engine.service';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

/**
 * Component to configure system-wide color palettes for light and dark modes.
 */
@Component({
  selector: 'app-color-config',
  standalone: true,
  imports: [CommonModule, ColorPickerModule, ButtonModule, FormsModule],
  templateUrl: './color-config.component.html',
  styleUrls: ['./color-config.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorConfigComponent {
  private readonly colorConfigService = inject(ColorConfigService);
  private readonly themeEngineService = inject(ThemeEngineService); // Instantiates the engine for live preview
  
  readonly config = this.colorConfigService.config;

  onColorChange(mode: 'light' | 'dark', type: keyof ColorPalette, value: string): void {
    this.colorConfigService.updateColor(mode, type, value);
  }

  resetToDefaults(): void {
    this.colorConfigService.resetToDefaults();
  }

  exportConfig(): void {
    const blob = this.colorConfigService.exportConfig();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-config-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      await this.colorConfigService.importConfig(file);
      input.value = ''; // Reset input
    }
  }
}
