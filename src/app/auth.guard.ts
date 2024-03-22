import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Izinkan navigasi jika pengguna terautentikasi
    } else {
      this.router.navigate(['/']); // Redirect ke halaman login jika pengguna tidak terautentikasi
      return false;
    }
  }
}
