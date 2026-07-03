import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-consult',
  imports: [CommonModule],
  templateUrl: './ai-consult.html',
  styleUrl: './ai-consult.css',
})
export class AiConsult {
  showResult = false;

  phanTichDa() {
    this.showResult = true;
  }

  selectAge(event: Event) {
    const btn = event.target as HTMLElement;
    btn.closest('.age-group')?.querySelectorAll('.age-btn')
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  selectGender(event: Event) {
    const btn = event.target as HTMLElement;
    btn.closest('.gender-group')?.querySelectorAll('.gender-btn')
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  imagePreview: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}