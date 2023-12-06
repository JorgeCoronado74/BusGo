import { Component } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  async signIn() {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
      console.log('Usuario autenticado:', userCredential.user);

      // Verificar si el usuario es correcto y redirigirlo
      if (userCredential && userCredential.user) {
        // Redirige al usuario a la página de tabs después de iniciar sesión exitosamente
        this.router.navigate(['/tabs']);
      } else {
        console.error('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      // Manejar errores de autenticación
    }
  }
  async loginWithGoogle(): Promise<void> {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Usuario autenticado con Google:', result.user);

      // Redirige a la página deseada después de iniciar sesión exitosamente
      // Puedes agregar una redirección aquí si es necesario
      this.router.navigate(['/tabs']);
    } catch (error) {
      console.error('Error al iniciar sesión con Google desde el componente:', error);
      // Manejar errores de inicio de sesión con Google
    }
  }
  
}
