import { Usuario } from "./acesso/usuario.model";

import * as firebase from 'firebase'
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class auth{

    constructor(private router:Router)
    {}

    public token_id:string

    public cadastrarUsuario(user:Usuario):Promise<any>{

        return firebase.auth().createUserWithEmailAndPassword(user.email, user.senha)
        .then( (resposta:any) => {

            delete user.senha
            firebase.database().ref(`usuario_detalhe/${btoa(user.email)}`)
                .set({user})
        })
    }

    public autenticar(email:string, senha:string):Promise<any>{
        console.log(email, senha)
        return firebase.auth().signInWithEmailAndPassword(email, senha)
            .then( (resposta:any) => {
                firebase.auth().currentUser.getIdToken()
                .then( (idToken: string) =>{
                    this.token_id = idToken
                    localStorage.setItem("idToken", idToken)
                    this.router.navigate(['/home'])
                })
            })
    }

    public autenticado():boolean{
        if(this.token_id === undefined && localStorage.getItem("idToken") != null){
            this.token_id = localStorage.getItem("idToken")
        }

        if(this.token_id === undefined){
            this.router.navigate(['/'])
        }
        
        return this.token_id !== undefined        
    }

    public sair():void{
        firebase.auth().signOut()
            .then(() =>{
                localStorage.removeItem("idToken")
                this.token_id = undefined
                this.router.navigate(["/"])
            })
        
    }
}