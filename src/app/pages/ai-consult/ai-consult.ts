import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ai-consult',
  imports: [CommonModule],
  templateUrl: './ai-consult.html',
  styleUrl: './ai-consult.css',
})
export class AiConsult {
  showResult = false;
  isLoading = false;
  message = '';

  // Lưu đáp án người dùng chọn
  selectedAge = '';
  selectedGender = '';
  selectedSkinConditions: string[] = [];
  selectedGoals: string[] = [];

  // Kết quả từ API
  loaiDa = '';
  skinConcerns: string[] = [];
  routine: any[] = [];

  imagePreview: string | null = null;

  private apiUrl = 'http://localhost:5000/api/skin-algo/analyze';

  constructor(private http: HttpClient) {}

  selectAge(event: Event) {
    const btn = event.target as HTMLElement;
    btn.closest('.age-group')?.querySelectorAll('.age-btn')
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.selectedAge = btn.textContent?.trim() || '';
  }

  selectGender(event: Event) {
    const btn = event.target as HTMLElement;
    btn.closest('.gender-group')?.querySelectorAll('.gender-btn')
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.selectedGender = btn.textContent?.trim() || '';
  }

  toggleSkinCondition(value: string) {
    const idx = this.selectedSkinConditions.indexOf(value);
    if (idx > -1) {
      this.selectedSkinConditions.splice(idx, 1);
    } else {
      this.selectedSkinConditions.push(value);
    }
  }

  toggleGoal(value: string) {
    const idx = this.selectedGoals.indexOf(value);
    if (idx > -1) {
      this.selectedGoals.splice(idx, 1);
    } else {
      this.selectedGoals.push(value);
    }
  }

  isConditionSelected(value: string): boolean {
    return this.selectedSkinConditions.includes(value);
  }

  isGoalSelected(value: string): boolean {
    return this.selectedGoals.includes(value);
  }

  // Chuyển đáp án thành mảng ký tự để gửi lên API
  buildAnswers(): string[] {
    const answers: string[] = [];

    // Độ tuổi → ký tự
    const ageMap: {[key: string]: string} = {
      '< 18': 'A', '18 - 24': 'A', '25 - 34': 'B',
      '35 - 44': 'C', '> 45': 'D'
    };
    if (this.selectedAge) answers.push(ageMap[this.selectedAge] || 'A');

    // Giới tính
    answers.push(this.selectedGender === 'Nữ' ? 'A' : 'B');

    // Tình trạng da
    const conditionMap: {[key: string]: string} = {
      'do-dau': 'A', 'kich-ung': 'D', 'noi-mun': 'A',
      'chan-long': 'A', 'kho-cang': 'B', 'xin-mau': 'C'
    };
    this.selectedSkinConditions.forEach(c => answers.push(conditionMap[c] || 'A'));

    // Mục tiêu
    const goalMap: {[key: string]: string} = {
      'tri-mun': 'A', 'duong-am': 'B',
      'chong-lao-hoa': 'C', 'phuc-hoi': 'B', 'lam-sang': 'C'
    };
    this.selectedGoals.forEach(g => answers.push(goalMap[g] || 'A'));

    return answers.length > 0 ? answers : ['A'];
  }

  phanTichDa() {
    const answers = this.buildAnswers();
    this.isLoading = true;
    this.message = '';

    this.http.post<any>(this.apiUrl, { answers }).subscribe({
      next: (res) => {
        this.loaiDa = res.loai_da;
        this.skinConcerns = res.skin_concerns || [];
        this.routine = res.routine || [];
        this.showResult = true;
        this.isLoading = false;
      },
      error: (err) => {
        this.message = 'Không thể kết nối server. Vui lòng thử lại!';
        this.isLoading = false;
        // Hiển thị kết quả mẫu khi không có server
        this.loaiDa = 'Da dầu';
        this.skinConcerns = ['mun', 'tham_mun'];
        this.routine = [];
        this.showResult = true;
      }
    });
  }

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