import { Usuario } from "./acesso/usuario.model";

import * as firebase from 'firebase'

export class auth{

    public cadastrarUsuario(user:Usuario):void{

        firebase.auth().createUserWithEmailAndPassword(user.email, user.senha)
        .then( (resposta:any) => {

            delete user.senha
            firebase.database().ref(`usuario_detalhe/${btoa(user.email)}`)
                .set({user})
        })
        .catch( (error:any) =>{
            console.log(error)
        })
        console.log("serviço", user)
    }
}