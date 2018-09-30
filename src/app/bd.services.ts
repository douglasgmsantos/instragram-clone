
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

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push({titulo: publicacao.titulo})
        .then((resposta: any)=>{

            let nomeImagem = resposta.key
            firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot: any) => {
                    this.proresso.status = 'ANDAMENTO'
                    this.proresso.estado = snapshot
                },
                (error: any) => {
                    this.proresso.status = 'ERROR'
                },
                () =>{
                    this.proresso.status = 'CONCLUIDO'

                }
            )
            
        })
    }

    public consultaPublicacao(email:string):Promise<any>{

        return new Promise((resolve, reject)=>{
            firebase.database().ref(`publicacoes/${btoa(email)}`)
            .orderByKey()
            .once('value')
            .then((snapshot:any) => {

                let publicacoes: Array<any> = [];

                snapshot.forEach((childSnapshot:any) => {
                    let publicacao = childSnapshot.val()
                    publicacao.key = childSnapshot.key
                    publicacoes.push(publicacao)
                    
                    
                });
                return publicacoes.reverse()
            })
            .then( (publicacoes: any) =>{

                publicacoes.forEach((publicacao) => {
                    firebase.storage().ref()
                    .child(`imagens/${publicacao.key}`)
                    .getDownloadURL()
                    .then((url:string)=>{
                        publicacao.url_imagem = url
    
                        firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                        .once('value')
                        .then((snapshot: any) =>{
                            publicacao.name_usuario = snapshot.val().user.nome_usuario
                        })
                        publicacoes.push(publicacao)
                    })
                })
        
                resolve(publicacoes)
            })
        })        
    }

}
