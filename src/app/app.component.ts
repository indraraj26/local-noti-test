import { Component } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  clickSub: any;

  constructor(
    private localNotifications: LocalNotifications,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.clickSub = this.localNotifications.on('click').subscribe((data) => {
      this.presentAlert(
        'Your notifiations contains a secret = ' + data.data.secret
      );
    });
  }

  async simpleNotif() {
    try {
      const isPermissionGiven = await this.localNotifications.hasPermission();
      if (!isPermissionGiven) {
        const requestPermissionResult =
          await this.localNotifications.requestPermission();
        if (!requestPermissionResult) {
          throw new Error(
            'please give permission, redirect the user to setting to enable it manually'
          );
        }
      }
      this.localNotifications.schedule({
        id: 1,
        text: 'Single Local Notification',
        data: { secret: 'secret' },
      });
    } catch (e) {
      console.log(e, 'error');
    }
  }

  async presentAlert(data: any) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: data,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
