import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage{

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();
  public usuario: Usuario;
  public respuesta: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    
  )
    {
      this.usuario = new Usuario();
      //Esta wea de abajo nos faltaba.
      this.usuario.recibirPregunta(this.activatedRoute, this.router);
      this.respuesta = '';
    }

    EnviarRespuesta() {
      if(this.respuesta == this.usuario.respuestaSecreta) {
        this.mostrarMensajeEmergente('Esta es tu respuesta');
        this.usuario.navegarEnviandoPregunta(this.router, '/correcto');
        return;
      }else{
        this.mostrarMensajeEmergente('Weon WUAJAJAJAJAJ');
        this.usuario.navegarEnviandoPregunta(this.router, '/incorrecto');
      }
      
      
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
