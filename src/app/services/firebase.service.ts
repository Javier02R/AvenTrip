import { Injectable } from '@angular/core';
import { Firestore, collectionData, deleteDoc, addDoc, collection, doc, docData } from '@angular/fire/firestore';
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
  private pendientesCollection;

  constructor(private firestore: Firestore) {
    this.pendientesCollection = collection(this.firestore, 'sitios_pendientes');
    this.sitiosCollection = collection(this.firestore, 'sitios');
  }

  getSitios(): Observable<Sitio[]> {
    return collectionData(this.sitiosCollection, {idField: 'id'}) as Observable<Sitio[]>;

  }

  getSitioById(id: string): Observable<Sitio> {
    const sitioDoc = doc(this.firestore, `sitios/${id}`);
    return docData(sitioDoc) as Observable<Sitio>;
  }

  getTodasLasRutas(): Observable<Sitio[]> {
  const rutasRef = collection(this.firestore, 'sitios');
  return collectionData(rutasRef, { idField: 'id' }) as Observable<Sitio[]>;
}

addSitioPendiente(sitio: Sitio) {
  return addDoc(this.pendientesCollection, {
    sitio,
    fecha: new Date()
  }).catch((error) => {
    console.error('Error al agregar el sitio pendiente:', error);
    throw error;
  });
}

addSitio(sitio:Sitio) {
  return addDoc(this.sitiosCollection, sitio).catch((error) => {
    console.error('Error al agregar el sitio:', error);
    throw error;
  });
}

getSitiosPendientes() {
  return collectionData(this.pendientesCollection, { idField: 'id' });
}

async aprobarSitio(pendiente: any) {
  try {
    const sitio = pendiente.sitio;
    await addDoc(this.sitiosCollection, sitio);
    console.log('Sitio aprobado y publicado');
  } catch (error) {
    console.error('Error al aprobar sitio:', error);
  }
}


async eliminarPendiente(id: string) {
  const docRef = doc(this.firestore, 'sitios_pendientes', id);
  await deleteDoc(docRef);
  console.log('Pendiente eliminado');
}
}
