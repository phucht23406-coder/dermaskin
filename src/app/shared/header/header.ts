import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // RẤT QUAN TRỌNG

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule], // Phải có cái này để routerLink hoạt động
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header { }