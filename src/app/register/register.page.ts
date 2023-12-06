import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, push } from 'firebase/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {

  email: string = '';
      password: string = '';
      confirmPassword: string = '';
      firstName: string = '';
      lastName: string = '';
      phoneNumber: string = '';
      birthDate: string = '';
    
      constructor(private router: Router) {
        // Verifica si el router está disponible
        if (this.router) {
          console.log('El router está disponible');
        } else {
          console.log('El router no está disponible');
        }
      }

    
      async register() {
        try {
          if (this.password !== this.confirmPassword) {
            console.error('Las contraseñas no coinciden');
            return;
          }
    
          const auth = getAuth();
          const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
          console.log('Registro exitoso.', userCredential.user);
    
          // Agregar datos a Realtime Database con clave automática generada
          const db = getDatabase();
          const usersRef = ref(db, 'users');
          const newUserRef = push(usersRef);
    
          const user = {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            birthDate: this.birthDate
            // Agrega más campos según sea necesario
          };
    
          push(newUserRef, user);
    
          this.router.navigate(['/tabs/tab1']); // Redirige al usuario a la página de tabs1 después de registrarse con éxito
    
        } catch (error) {
          console.error('Error al registrar usuario:', error);
        }
      }

}