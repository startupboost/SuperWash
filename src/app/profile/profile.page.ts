import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  fullname = "";
  mobile = "";
  email;
  user_value;
  userCollection:AngularFirestoreCollection;
  constructor(db: AngularFirestore, public loadingController: LoadingController,public alertController: AlertController, public auth: AngularFireAuth,private router : Router) {
    this.userCollection = db.collection("users");
   }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.auth.auth.onAuthStateChanged(user=>{
      if(user){
        this.email = user.email;
        this.userCollection.doc(this.email).valueChanges().subscribe(x=>{
          console.log(x);
          this.user_value = x;
          this.fullname = this.user_value.fullname;
          this.mobile = this.user_value.mobile;
        });
      }
    });
  }

  

  logout(){
      this.auth.auth.signOut();
      this.auth.auth.onAuthStateChanged(user=>{
        if(user){
          console.log(user);
          this.router.navigateByUrl('home');
        }else{
          this.router.navigateByUrl('main');
        }
      });
  }

}
