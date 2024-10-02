import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { Asistencia } from 'src/app/model/asistencia';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'miclase.page.html',
  styleUrls: ['miclase.page.scss'],
})
export class MiclasePage implements OnInit {
  sede: string = '';
  idAsignatura: string = '';
  seccion: string = '';
  nombreAsignatura: string = '';
  nombreProfesor: string = '';
  dia: string = '';
  bloqueInicio: number = 0;
  bloqueTermino: number = 0;
  horaInicio: string = '';
  horaFin: string = '';

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('bienvenida', { read: ElementRef }) itemBienvenida!: ElementRef;
  
  @ViewChild('sedeData', { read: ElementRef }) sedeData!: ElementRef;
  @ViewChild('idAsignaturaData', { read: ElementRef }) idAsignaturaData!: ElementRef;
  @ViewChild('seccionData', { read: ElementRef }) seccionData!: ElementRef;
  @ViewChild('nombreAsignaturaData', { read: ElementRef }) nombreAsignaturaData!: ElementRef;
  @ViewChild('nombreProfesorData', { read: ElementRef }) nombreProfesorData!: ElementRef;
  @ViewChild('diaData', { read: ElementRef }) diaData!: ElementRef;
  @ViewChild('bloqueInicioData', { read: ElementRef }) bloqueInicioData!: ElementRef;
  @ViewChild('bloqueTerminoData', { read: ElementRef }) bloqueTerminoData!: ElementRef;
  @ViewChild('horaInicioData', { read: ElementRef }) horaInicioData!: ElementRef;
  @ViewChild('horaFinData', { read: ElementRef }) horaFinData!: ElementRef;

  public usuario: Usuario;
  public escaneando = false;
  public datosQR: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
  ) {
    this.usuario = new Usuario();
    this.usuario.recibirDatos(this.activatedRoute, this.router);  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.sede = params['sede'];
      this.idAsignatura = params['idAsignatura'];
      this.seccion = params['seccion'];
      this.nombreAsignatura = params['nombreAsignatura'];
      this.nombreProfesor = params['nombreProfesor'];
      this.dia = params['dia'];
      this.bloqueInicio = params['bloqueInicio'];
      this.bloqueTermino = params['bloqueTermino'];
      this.horaInicio = params['horaInicio'];
      this.horaFin = params['horaFin'];
    });
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
  

  navegar(pagina: string) {

    this.usuario.navegarEnviandoTodo(this.router, pagina);
  }

  navegarSinDatos(pagina: string) {
    this.usuario.navegarSinEnviarUsuario(this.router, pagina);
    }
}
