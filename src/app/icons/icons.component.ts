import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { PaiementService } from '../services/paiement.service';
import { Paiement } from '../classes/paiement';
import { Session } from 'app/classes/session';

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
  constructor(private sessionService:SessionService,private paiementService:PaiementService) { }
prix:number;
  ngOnInit() {
    this.session=new Session();
    this.paiement=new Paiement();
    this.readpaiement();
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

}
