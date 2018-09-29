import * as firebase from 'firebase'

export class Bd{

    public pulicar(publicacao):void{

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({titulo: publicacao.titulo})
    }
}