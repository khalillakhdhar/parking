  
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewPaiement(record) {
    return this.firestore.collection('paiement').add(record);
  }

  read_Paiements() {
    return this.firestore.collection('paiement').snapshotChanges();
  }

  update_Paiement(recordID, record) {
    this.firestore.doc('paiement/' + recordID).update(record);
    console.log('updated');
  }

  delete_Paiement(record_id) {
    this.firestore.doc('paiement/' + record_id).delete();
  }
}