import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
loginState = 0;
errormessage: string;
email = '';
password = '';
subscription: any;
  constructor(public router: Router, public platform: Platform) {}

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
        const key = 'app';
        navigator[key].exitApp();
    });
}

ionViewWillLeave() {
    this.subscription.unsubscribe();
}
  goToNextPage() {
    if (this.loginState === 0) {
      this.loginState = 1;
      return;
    }
    console.log(this.email);
    console.log(this.password);
    if (this.email == null && this.password == null) {
      console.log('both not given');
      this.errormessage = 'Please enter a valid email';
      return;
    }
    if (this.email.trim() === '' || this.email.trim() === null) {
      this.errormessage = 'Email is required!';
      console.log('email not given');
      return;
    }
    if (this.password.trim() === '' || this.password.trim() === null) {
      this.errormessage = 'Password is required!';
      console.log('password not given');
      return;
    }
    localStorage.setItem('email', this.email);
    this.router.navigateByUrl('/landing-page');
  }
}
