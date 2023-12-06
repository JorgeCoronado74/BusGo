import { Component, OnInit } from '@angular/core';
import { getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, push, set, get, update, remove } from 'firebase/database';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  private db = getDatabase();
  ciudades: any[] = []; // Debes definir la estructura de tus datos
  seleccion: { salida: any, destino: any } = { salida: null, destino: null };

  constructor(private router: Router) {}

  selectCiudad(tipo: 'salida' | 'destino', id: any): void {
    // Aquí puedes manejar la selección según el tipo (salida o destino)
    if (tipo === 'salida') {
      this.seleccion.salida = id;
    } else if (tipo === 'destino') {
      this.seleccion.destino = id;
    }

    // También puedes realizar otras acciones relacionadas con la selección si es necesario
    console.log('Selección:', this.seleccion);
  }
  ngOnInit() {
    this.getCiudades();
  }

  async getCiudades(): Promise<void> {
    try {
      const ciudadesRef = ref(this.db, 'ciudades');
      const snapshot = await get(ciudadesRef);

      if (snapshot.exists()) {
        // snapshot.val() contiene los datos de la colección
        this.ciudades = Object.values(snapshot.val());
        console.log('Ciudades:', this.ciudades);
      } else {
        console.error('La colección de ciudades no existe.');
      }
    } catch (error) {
      console.error('Error al obtener ciudades:', error);
    }
  }
  async logout(): Promise<void> {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Manejar errores de cierre de sesión
    }
  }

}