import { Usuario } from "./acesso/usuario.model";

export class auth{

    public cadastrarUsuario(user:Usuario):void{

        console.log("serviço", user)
    }
}