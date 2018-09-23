import { Usuario } from "./acesso/usuario.model";

import * as firebase from 'firebase'

export class auth{

    public cadastrarUsuario(user:Usuario):Promise<any>{

        return firebase.auth().createUserWithEmailAndPassword(user.email, user.senha)
        .then( (resposta:any) => {

            delete user.senha
            firebase.database().ref(`usuario_detalhe/${btoa(user.email)}`)
                .set({user})
        })
        .catch( (error:any) =>{
            console.log(error)
        })
    }

    public autenticar(email:string, senha:string):void{
        console.log(email, senha)
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then( (resposta:any) => {
                console.log(resposta)
            })
            .catch( (error:any) => {
                console.log(error)
            })
    }
}