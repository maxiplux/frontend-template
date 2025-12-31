import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorConfigService, ColorPalette } from '../../services/color-config.service';
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
  
  readonly config = this.colorConfigService.config;

  onColorChange(mode: 'light' | 'dark', type: keyof ColorPalette, value: string): void {
    this.colorConfigService.updateColor(mode, type, value);
  }

  resetToDefaults(): void {
    this.colorConfigService.resetToDefaults();
  }
}
