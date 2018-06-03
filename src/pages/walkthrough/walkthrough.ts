import { Component, ViewChild } from '@angular/core';
import { Slides, NavController } from 'ionic-angular';
import { AuthPage } from '../auth/auth';


@Component({
  selector: 'page-walkthrough',
  templateUrl: 'walkthrough.html',
})
export class WalkthroughPage {
	@ViewChild(Slides) slides: Slides;
  showSkip = true;
  dir: string = 'ltr';

  slideList: Array<any> = [
    {
      title: "¿Que es <strong>Yachay</strong>Services?",
      description: "Una aplicación desarrollada para facilitar la adquisición y venta de productos dentro de nuestra universidad.",
      image: "assets/imgs/pera.png",
    },
    {
      title: "¿Porque comprar con <strong>Yachay</strong>Services?",
      description: "Visualiza de manera más fácil los productos, genera un carrito de compras, realiza tu compra y mantente al tanto de el estado de entrega.",
      image: "assets/imgs/fresa.png",
    },
    {
      title: "¿Porque vender con <strong>Yachay</strong>Services?",
      description: "Facilidad a la hora de ofertar un producto, también facilita su entrega atraves de una lista de entrega ordenada para el vendedor.",
      image: "assets/imgs/uva.png",
    }

  ];

  constructor(public navCtrl: NavController) {
  }

  onSlideNext() {
    this.slides.slideNext(300)
  }

	onSlidePrev() {
    this.slides.slidePrev(300)
  }

  onLastSlide() {
  	this.slides.slideTo(3, 300)
  }

  openHomePage() {
  	this.navCtrl.setRoot(AuthPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WalkthroughPage');
  }

}
