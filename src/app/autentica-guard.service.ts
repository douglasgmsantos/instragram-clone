import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { auth } from "./auth.service";

@Injectable()
export class AutenticacaoGuard implements CanActivate{
    constructor(
        private autenticacao: auth 
    )
    {}
    canActivate():boolean {
        return this.autenticacao.autenticado();
    }

}