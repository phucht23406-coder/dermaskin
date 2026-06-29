import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warranty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warranty.html', // Trỏ đúng vào tên file html ngắn gọn
  styleUrls: ['./warranty.css']   // Trỏ đúng vào tên file css ngắn gọn
})
export class WarrantyComponent {
  currentTab: string = 'activate'; 
  isSubmitted: boolean = false; 

  changeTab(tabName: string) {
    this.currentTab = tabName;
    this.isSubmitted = false;
  }

  submitRequest() {
    this.isSubmitted = true;
  }
}