import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated: boolean = false; 
  constructor(private router: Router) {}

  login(token: string) {
    localStorage.setItem('authToken', token);
    this._isAuthenticated = true; 
    // Navigasi ke halaman dashboard setelah login
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('authToken');
    this._isAuthenticated = false; // Menggunakan _isAuthenticated di sini
    // Navigasi ke halaman home setelah logout
    this.router.navigate(['/home']);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean { 
    return this._isAuthenticated;
  }
}
