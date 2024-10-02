import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import jsQR, { QRCode } from 'jsqr';
import { Asistencia } from 'src/app/model/asistencia';

@Component({
  selector: 'app-home',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class InicioPage implements AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('bienvenida', { read: ElementRef })itemBienvenida!: ElementRef;
  @ViewChild('nombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;

  public usuario: Usuario;
  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;  // Added escaneando property
  public datosQR: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
  ) {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }
  

  ngAfterViewInit() {
    this.animarTituloIzqDer();
    this.animarBienvenida();
    this.animarNombre();
    this.comenzarEscaneoQR();
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

  animarBienvenida() {
    this.animationController
      .create()
      .addElement(this.itemBienvenida.nativeElement)
      .duration(1500) 
      .iterations(1) 
      .keyframes([
        { offset: 0, transform: 'translateY(100%)', opacity: '0' },
        { offset: 0.6, transform: 'translateY(-10%)', opacity: '1' },
        { offset: 1, transform: 'translateY(0%)', opacity: '1' } 
      ])
      .play();
  }  
  
  animarNombre() {
    this.animationController
      .create()
      .addElement(this.itemNombre.nativeElement)
      .duration(1500)
      .iterations(1) 
      .fromTo('transform', 'scale(0.5)', 'scale(1)')
      .fromTo('opacity', 0, 1)
      .play();
  }

  // Added methods for QR scanning
  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.guardarDatosQR(qrCode.data);
        return true;
      }
    }
    return false;
  }

  private guardarDatosQR(datosQR: string): void {
    console.log('Datos QR:', datosQR);
    try {
      const objetoDatosQR = JSON.parse(datosQR);
      this.asistencia.setAsistencia(
        objetoDatosQR.bloqueInicio,
        objetoDatosQR.bloqueTermino,
        objetoDatosQR.dia,
        objetoDatosQR.horaFin,
        objetoDatosQR.horaInicio,
        objetoDatosQR.idAsignatura,
        objetoDatosQR.nombreAsignatura,
        objetoDatosQR.nombreProfesor,
        objetoDatosQR.seccion,
        objetoDatosQR.sede
      );

      const navigationExtras: NavigationExtras = {
        queryParams: {
          sede: this.asistencia.sede,
          idAsignatura: this.asistencia.idAsignatura,
          seccion: this.asistencia.seccion,
          nombreAsignatura: this.asistencia.nombreAsignatura,
          nombreProfesor: this.asistencia.nombreProfesor,
          dia: this.asistencia.dia,
          bloqueInicio: this.asistencia.bloqueInicio,
          bloqueTermino: this.asistencia.bloqueTermino,
          horaInicio: this.asistencia.horaInicio,
          horaFin: this.asistencia.horaFin
        },
        state: {
          cuenta: this.usuario.cuenta,
          password: this.usuario.password,
        }
      };

      console.log('Navegando a /miclase con:', navigationExtras);
      this.router.navigate(['/miclase'], navigationExtras);

    } catch (error) {
      console.error('Error al parsear los datos del QR:', error);
    }
  }

  // Method to stop scanning
  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  navegar(pagina: string){
    this.usuario.navegarEnviandoTodo(this.router, pagina);
  }

  navegarSinDatos(pagina: string) {
    this.usuario.navegarSinEnviarUsuario(this.router, pagina);
    }
}
