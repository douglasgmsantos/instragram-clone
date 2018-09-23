import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {Usuario} from '../usuario.model'
import { auth } from '../../auth.service';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  animations:[
    trigger('notificacao-cadastro',[
      transition("NAO-NOTIFICAR => NOTIFICAR",[
        animate('700ms 0s ease-in-out', keyframes([
          style({offset: 0.92, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.94, opacity: 1, transform: 'translateY(10px)'}),
          style({offset: 0.96, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.98, opacity: 1, transform: 'translateY(10px)'}),
        ]))
      ])
    ])
  ]
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel:EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'nome_completo': new FormControl(null, [Validators.required]),
    'nome_usuario': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  public messageError:string = "";
  public notificarPainel = "NAO-NOTIFICAR"
  constructor(
    private auth: auth
  ) { }

  ngOnInit() {
  }

  public exibirPainelLogin():void{
    this.exibirPainel.emit('login')
  }


  public cadastroUsuario():void{

    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha,
    )

    this.auth.cadastrarUsuario(usuario)
      .then(() => this.exibirPainelLogin())
      .catch( (error:any) =>{
        console.log(error)
        this.messageError = error.message
        this.notificarPainel = "NOTIFICAR" 
    })
  }

}
