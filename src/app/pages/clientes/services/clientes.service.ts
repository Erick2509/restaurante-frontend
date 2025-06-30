import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  constructor(private firestore: Firestore) {}

  getClientes(): Observable<any[]> {
    const clientesRef = collection(this.firestore, 'usuarios');
    return collectionData(clientesRef, { idField: 'id' }) as Observable<any[]>;
  }
}
