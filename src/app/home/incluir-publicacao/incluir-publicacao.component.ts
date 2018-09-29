import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as firebase from 'firebase';

import {Bd} from '../../bd.services';
import { Progresso } from '../../progress.service';
import { Subject} from 'rxjs'
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs/Rx'


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string;
  private imagem: any;

  public formulario: FormGroup = new FormGroup({
    'titulo' : new FormControl(null)
  })

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }


  public publicar():void{
    this.bd.pulicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem
    });

    let acompanhamentoUpload = Observable.interval(500)
    let continua = new Subject()

    continua.next(true)

    acompanhamentoUpload
      .takeUntil(continua)
      .subscribe( ()=>{
        console.log(this.progresso.status)
        console.log(this.progresso.estado)

        if(this.progresso.status = 'CONCLUIDO'){
          continua.next(false)
        }
      })

  }

  public preparaImagemUpload(event: Event):void{
    this.imagem = (<HTMLInputElement>event.target).files[0];
  }

}
