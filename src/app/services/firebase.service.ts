import { Injectable } from '@angular/core';
import { Firestore, collectionData, addDoc, collection, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Sitio {
  id?: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  calificacion: number;
  direccion: string;
  lat: number;
  lng: number;

}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private sitiosCollection;

  constructor(private firestore: Firestore) {
    this.sitiosCollection = collection(this.firestore, 'sitios')
  }

  getSitios(): Observable<Sitio[]> {
    return collectionData(this.sitiosCollection, {idField: 'id'}) as Observable<Sitio[]>;

  }

  getSitioById(id: string): Observable<Sitio> {
    const sitioDoc = doc(this.firestore, `sitios/${id}`);
    return docData(sitioDoc) as Observable<Sitio>;
  }

  addSitio(sitio:Sitio) {
    return addDoc(this.sitiosCollection, sitio).catch((error) => {
      console.error('Error al agregar el sitio:', error);
      throw error;
    });
  }

}
