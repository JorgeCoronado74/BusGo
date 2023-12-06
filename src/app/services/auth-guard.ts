// auth-guard.service.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Usuario autenticado, permite el acceso
          resolve(true);
        } else {
          // Usuario no autenticado, redirige a la página de inicio de sesión
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
