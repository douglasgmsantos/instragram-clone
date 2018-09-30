import { Component, OnInit } from '@angular/core';
import { Bd } from '../../bd.services';
import * as firebase from 'firebase'

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email:string
  public publicacoes:any

  constructor(
    private bd: Bd,
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      this.email = user.email
      this.atualizarTimeLine()
    })
  }

  public atualizarTimeLine():void{
    this.bd.consultaPublicacao(this.email)
    .then((publicacoes: any) => {
      this.publicacoes = publicacoes
    })
  }

}
