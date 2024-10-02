import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage{

  public usuario: Usuario;

  constructor(
      private router: Router
    , private activatedRoute: ActivatedRoute
    , private toastController: ToastController) 
  {
    this.usuario = new Usuario();
    this.usuario.recibirPregunta(activatedRoute, router);
    this.usuario.correo = ''
  }

  //esta funcion termina ocupando las otras funciones que se hicieron en el
  //usuario.ts para validar el correo y mandar la información extra.

  
  Correo() {
    const error = this.usuario.validarCorreoPregunta();
    if(error) {
      this.mostrarMensajeEmergente(error);
      return;
    } 
    this.mostrarMensajeEmergente('Contesta la siguiente pregunta de seguridad');
    this.usuario.navegarEnviandoPregunta(this.router, '/pregunta');
  }

  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
}
