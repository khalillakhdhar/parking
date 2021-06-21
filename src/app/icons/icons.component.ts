import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { PaiementService } from '../services/paiement.service';
import { Paiement } from '../classes/paiement';
import { Session } from 'app/classes/session';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
paiements:Paiement[];
sessions:Session[];
session:Session;
paiement:Paiement;
downloadURL: Observable<string>;
selectedFile: File = null;
cv:string;
fb = "";
  constructor(private storage: AngularFireStorage,private sessionService:SessionService,private paiementService:PaiementService) { }
prix:number;
  ngOnInit() {
    this.session=new Session();
    this.paiement=new Paiement();
    this.readpaiement();
    this.readsession();
  }
readpaiement()
{

  this.paiementService.read_Paiements().subscribe(data => {

    this.paiements = data.map(e => {
      return {
       id: e.payload.doc.id,

       
       prix_heure: e.payload.doc.data()["prix_heure"],



      };
    });
    for(let pa of this.paiements)
{
  this.prix=pa.prix_heure;
}
this.paiement.prix_heure=this.prix;

    console.log(this.paiements);

  });
}
readsession()
{

  this.sessionService.read_Sessions().subscribe(data => {

    this.sessions = data.map(e => {
      return {
       id: e.payload.doc.id,

       
       matricule: e.payload.doc.data()["matricule"],
       entree: e.payload.doc.data()["entree"],
       sortie: e.payload.doc.data()["sortie"],
       totale: e.payload.doc.data()["totale"],



      };
    });
   
    console.log(this.sessions);

  });
}
add()
{
  this.session.matricule=this.fb;
  this.session.entree=Date.now();
  this.session.totale=this.prix;
  this.session.sortie="NA"
let ses=Object.assign({},this.session);
this.sessionService.create_NewSession(ses);


}
edit(id)
{
  this.session.matricule=this.fb;
  this.session.sortie=Date.now();
let ses=Object.assign({},this.session);
this.sessionService.update_Session(id,ses);


}
onFileSelected(event) {
  var n = Date.now();
  const file = event.target.files[0];
  const filePath = `/offre/${n}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(`/offre/${n}`, file);
  task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe((url) => {
          if (url) {
            this.fb = url;
          }
          console.log(this.fb);
        });
      })
    )
    .subscribe((url) => {
      if (url) {
        console.log(url);
      }
    });
}
}
