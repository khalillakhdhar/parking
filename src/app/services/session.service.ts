  
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewSession(record) {
    return this.firestore.collection('Sessions').add(record);
  }

  read_Sessions() {
    return this.firestore.collection('Sessions').snapshotChanges();
  }

  update_Session(recordID, record) {
    this.firestore.doc('Sessions/' + recordID).update(record);
    console.log('updated');
  }

  delete_Session(record_id) {
    this.firestore.doc('Sessions/' + record_id).delete();
  }
}