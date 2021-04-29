import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'app/classes/utilisateur';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:Utilisateur;
  users:Utilisateur[];
  id:string;
  constructor(private userService:UserService) { }
  
  ngOnInit(): void {
    this.users=[];
    this.user=new Utilisateur();
this.id=localStorage.getItem("id");
    this.read();
    
  }
  read()
  {
    this.userService.read_Users().subscribe(data => {
  
      this.users = data.map(e => {
        return {
         id: e.payload.doc.id,
  
         nom: e.payload.doc.data()["nom"],
         tel: e.payload.doc.data()["tel"],
         grade: e.payload.doc.data()["grade"],
         login: e.payload.doc.data()["login"],
         mdp: e.payload.doc.data()["mdp"],
         adresse: e.payload.doc.data()["adresse"],
  
  
  
        };
      });
      console.log(this.users);
      this.verif();
    });
  
  
  }
  verif()
  {
  for(let us of this.users)
  {
  if((us.id==this.id))
  {
    this.user=us;
   
  
  
  }
  
  }
  console.log("currentuser",this.user);
  
  
  }


  update()
  {
    let us=Object.assign({},this.user);
    this.userService.update_User(this.id,us);
    alert("modifié");



  }
}
