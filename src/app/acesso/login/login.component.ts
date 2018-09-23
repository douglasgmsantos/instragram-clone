import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { auth } from '../../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter();

  public formulario:FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null,[Validators.required, Validators.minLength(6)]),
  });

  public messageError = ""
  constructor(
    private auth:auth
  ) { }

  ngOnInit() {
  }

  public exibirPainelCadastro():void{
    this.exibirPainel.emit('cadastro')
  }

  public autenticar():void{
    this.auth.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    )
    .catch( (error:any) => {
        this.messageError = (error.message || "Ocorreu um erro ao tentar autenticar.")
    })
  }

}
