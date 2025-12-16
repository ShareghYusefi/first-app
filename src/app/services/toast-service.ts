import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastCtrl: ToastController) {}

  show(position: 'top' | 'middle' | 'bottom', message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 1500,
        position: position,
      })
      .then((toast) => {
        toast.present();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
