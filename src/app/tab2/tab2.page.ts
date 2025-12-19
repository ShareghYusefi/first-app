import { Component } from '@angular/core';
import {
  EmailComposer,
  HasAccountResult,
  OpenOptions,
} from 'capacitor-email-composer';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  constructor() {}

  openEmail() {
    EmailComposer.hasAccount()
      .then((result: HasAccountResult) => {
        // if result is truthy, user has mail account setup
        if (result) {
          // open the email composer
          EmailComposer.open({
            to: ['sharegh.yusefi@robogarden.ca'],
            subject: 'Email button clicked!',
            body: 'This is a test email from the Ionic first-app application.',
          });
        }
      })
      .catch((error) => {
        console.error('Error checking email account: ', error);
      });
  }
}
