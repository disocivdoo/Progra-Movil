import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {

  public usuario: Usuario;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ){
    this.usuario = new Usuario();
    this.usuario.recibirPregunta(activatedRoute, router);
   }

  ngOnInit() {
  }

  
  navegar(pagina: string){
    this.usuario.navegarSinEnviarUsuario(this.router, pagina);
  }

}
