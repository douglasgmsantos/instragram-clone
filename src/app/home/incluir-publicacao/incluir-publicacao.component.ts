import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()

  public messageModal:string = ''
  public email: string;
  public progressoPublicacao: string = 'PENDENTE'
  public porcentagemUpload: number = 0
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

    let acompanhamentoUpload = Observable.interval(1000)
    let continua = new Subject()
    let acompanhamentoMensagem = Observable.interval((1000)*30)

    let continuaMensagem = new Subject()

    continua.next(true)
    continuaMensagem.next(true)

    acompanhamentoUpload
      .takeUntil(continua)
      .subscribe( ()=>{
        this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) *100)
        this.progressoPublicacao = 'ANDAMENTO'

        if(this.progresso.status === 'CONCLUIDO'){
          this.progressoPublicacao = 'CONCLUIDO'
          this.messageModal = 'A publicação foi concluída com sucesso!'
          this.atualizarTimeLine.emit()
          continua.next(false)
        }
      })

      acompanhamentoMensagem
        .takeUntil(continuaMensagem)
        .subscribe( () => {
          if(this.progresso.status === 'CONCLUIDO'){
            this.progresso.status = 'PENDENTE'
            this.progressoPublicacao = 'PENDENTE'
            this.messageModal = ''
            continuaMensagem.next(true)
          }
        })

  }

  public preparaImagemUpload(event: Event):void{
    this.imagem = (<HTMLInputElement>event.target).files[0];
  }

}
