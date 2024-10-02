import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import { AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})

export class CorrectoPage implements OnInit {

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();
  
  public usuario: Usuario;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController) 
  {
    this.usuario = new Usuario();
    this.usuario.recibirPregunta(this.activatedRoute, this.router);
  }

  ngOnInit() {
  }


  navegarSinDatos(pagina: string) {
    this.usuario.navegarSinEnviarUsuario(this.router, pagina);
    }

}
