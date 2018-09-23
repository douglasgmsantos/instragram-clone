import { Component, OnInit } from '@angular/core';
import { auth } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private autenticacao:auth
  ) { }

  ngOnInit() {
  }

  public sair():void{
    this.autenticacao.sair();
  }

}
