import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'instagram-clone';

  ngOnInit():void{

    var config = {
      apiKey: "AIzaSyBjSfIRF2wgmWU4kpM39CzzSsacS8eMfgQ",
      authDomain: "instagran-clone-29cdc.firebaseapp.com",
      databaseURL: "https://instagran-clone-29cdc.firebaseio.com",
      projectId: "instagran-clone-29cdc",
      storageBucket: "instagran-clone-29cdc.appspot.com",
      messagingSenderId: "599231190430"
    };

    firebase.initializeApp(config)
  }
}
