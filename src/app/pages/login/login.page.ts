import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { NivelEducacional } from 'src/app/model/nivel-educacional';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public usuario: Usuario;
  usuarios: Usuario[] = [];

  constructor(
      private router: Router
    , private activatedRoute: ActivatedRoute
    , private toastController: ToastController) 
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(activatedRoute, router);
  }

  ingresar() {
    const error = this.usuario.validarUsuario();
    if(error) {
      this.mostrarMensajeEmergente(error);
      return;
    } 
    this.mostrarMensajeEmergente('¡Bienvenido(a) al Sistema de Asistencia DUOC!');
    this.usuario.navegarEnviandousuario(this.router, '/inicio');
  }

  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

  navegar(pagina: string){
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }
}
