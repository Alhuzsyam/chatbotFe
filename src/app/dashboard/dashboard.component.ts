import { Component, OnInit } from '@angular/core';
import { SideBarJs } from 'src/assets/js/script.js'; // Import fungsi SidebarJs dari file script.js
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router:Router, private http:HttpClient){}
  name:string = ''
  email:string =''
  id:string=''
  ngOnInit(): void {
    SideBarJs();
    this.parseLocalStorageData()
    let refreshDone: any = localStorage.getItem('refreshDone');
    if (refreshDone === 'true') {
      location.reload();
      localStorage.setItem('refreshDone', 'false');
    } else {
      localStorage.setItem('refreshDone', 'true');
    }
  }
  parseLocalStorageData() {
    const dataFromLocalStorage = localStorage.getItem("data");
    if (dataFromLocalStorage) {
      try {
        const parsedData = JSON.parse(dataFromLocalStorage);
        this.id = parsedData.id.toString(); 
        this.name = parsedData.name || ''; 
        this.email = parsedData.email || ''; 
         
      } catch (error) {
        console.error("Terjadi kesalahan dalam parsing JSON:", error);
      }
    } else {
      console.error("Data dari localStorage tidak tersedia atau null.");
      this.router.navigate(['/']);
    }
  }
  logout() {
    // Clear all data from local storage
    localStorage.clear();
    // Navigate to the home page or any other desired route
    this.router.navigate(['/']);
  }
}

