import { Component } from '@angular/core';
import { getDatabase, ref, push, set, get, update, remove } from 'firebase/database';

interface Item {
  id?: string;
  nombre: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  items: Item[] = [];
  updatedItem: { [key: string]: string } = {};  

  newItem: Item = {

    nombre: '' 
  };

  private db = getDatabase();

  constructor() {}

  ionViewWillEnter() {
    this.loadItems();
  }

  loadItems() {
    const itemsRef = ref(this.db, 'items');
    get(itemsRef).then(snapshot => {
      const itemsData: { [key: string]: any } = snapshot.val() || {};
      this.items = Object.entries(itemsData).map(([key, value]) => {
        const item: Item = {
          id: key,
          nombre: value.nombre 
          
        };
        return item;
      });
    });
  }
  
  

  addItem() {
    const itemsRef = ref(this.db, 'items');
    const newItemWithId: Item = {
      nombre: this.newItem.nombre
    };
  
    push(itemsRef, newItemWithId).then((newItemRef) => {
      const newItemId = newItemRef.key; 
      this.newItem = { nombre: '' }; 
    
      if (newItemId !== null) {
        newItemWithId.id = newItemId;
        this.loadItems();
      } else {
        console.error('Error al obtener el ID del nuevo elemento.');
      }
    });
    
  }
  

  updateItem(itemId: string, newNombre: string) {
    const itemRef = ref(this.db, `items/${itemId}`);
    const updatedItem: Item = {
      nombre: newNombre
    };
    update(itemRef, updatedItem).then(() => {
      this.loadItems();
    });
  }

  deleteItem(itemId: string) {
    const itemRef = ref(this.db, `items/${itemId}`);
    remove(itemRef).then(() => {
      this.loadItems();
    });
  }

}
