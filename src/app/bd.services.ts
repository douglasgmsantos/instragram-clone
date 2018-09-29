
import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Progresso } from './progress.service';

@Injectable()
export class Bd{

    constructor(
        private proresso: Progresso
    ){

    }


    public pulicar(publicacao):void{
        
        let nomeImagem = Date.now()

        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot: any) => {
                    this.proresso.status = 'ANDAMENTO'
                    this.proresso.estado = snapshot
                    console.log(snapshot)
                },
                (error: any) => {
                    this.proresso.status = 'ERROR'
                    // console.log(error)
                },
                () =>{
                    this.proresso.status = 'CONCLUIDO'
                    // console.log("upload concluído com sucesso.");
                }
            )
        // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        //     .push({titulo: publicacao.titulo})
    }
}