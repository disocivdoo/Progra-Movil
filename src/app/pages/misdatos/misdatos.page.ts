import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import { AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})

export class MisdatosPage{

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();
  public usuario: Usuario;

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController) 
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state;
      this.usuario = new Usuario();
      this.usuario.id = state['id'];
      this.usuario.cuenta = state['cuenta'];
      this.usuario.nombre = state['nombre'];
      this.usuario.apellido = state['apellido'];
      this.usuario.correo = state['correo'];
      this.usuario.password = state['password'];
      this.usuario.preguntaSecreta = state['preguntaSecreta'];
      this.usuario.respuestaSecreta = state['respuestaSecreta'];
      this.usuario.nivelEducacional = state['nivelEducacional'];
      this.usuario.fechaNacimiento = state['fechaNacimiento'];
    }
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
     }
   
     animarTituloIzqDer() {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .duration(6000) 
        .iterations(Infinity) 
        .keyframes([
          { offset: 0, transform: 'translateX(0%)', opacity: '1' },  
          { offset: 0.5, transform: 'translateX(50%)', opacity: '0.5' }, 
          { offset: 1, transform: 'translateX(100%)', opacity: '1' } 
        ]);
    
      animation.play(); 
    }

  asignado(texto: string) {
    if (texto.trim() !== '') {
      return texto;
    }
    return 'No asignado';
  }

  async mostrarMensajeAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Datos personales',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  actualizarDatos() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
    console.log('Datos actualizados:', this.usuario);
  }

  navegar(pagina: string){
    this.usuario.navegarEnviandoTodo(this.router, pagina);
  }

  navegarSinDatos(pagina: string) {
    this.usuario.navegarSinEnviarUsuario(this.router, pagina);
    }
}


