import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
subjects: {
  display: string,
  name: string,
  page: string,
  icon: string,
  color: string,
  color_light: string,
  shadow: string
}[] = [];
subscription: any;
shadow = '0 10px 20px #eaaa6230, 0 6px 6px #eaaa623b';
  constructor(public router: Router, public navCtrl: NavController, public platform: Platform) {
    this.subjects = [
      {
        name: 'video',
        display: 'PLAY A VIDEO',
        page: '/video-list',
        icon: 'ios-film',
        color: '#eaaa62',
        color_light: '#ffcd93',
        shadow: ''
      },
      {
        name: 'read',
        display: 'READ A PDF',
        page: '/doc-list',
        icon: 'ios-paper',
        color: '#7cb8e8',
        color_light: '#a4d6ff',
        shadow: ''
      },
      {
        name: 'location',
        display: 'CURRENT LOCATION',
        page: null,
        icon: 'ios-navigate',
        color: '#e66288',
        color_light: '#f58dab',
        shadow: ''
      },
      {
        name: 'photo',
        display: 'TAKE A PHOTO',
        page: null,
        icon: 'camera',
        color: '#b377eb',
        color_light: '#d3a3ff',
        shadow: ''
      },
    ];

    this.subjects.forEach(element => {
      element.shadow = this.getShadow(element.color);
    });
  }

  getShadow(color: string): string {
    return '0 10px 20px ' + color + '30, 0 6px 6px ' + color + '3b';
  }
  ngOnInit() {
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
        const key = 'app';
        navigator[key].exitApp();
    });
}

ionViewWillLeave() {
    this.subscription.unsubscribe();
}

  logout() {
    localStorage.setItem('email', '');
    this.navCtrl.navigateBack('home');
    // this.router.navigate(['home']);
  }
  goToModule(name: string) {
    // name = name.replace('.', '');
    name = name.replace('(', '');
    name = name.replace(')', '');
    this.router.navigateByUrl('/dummy-module/' + name);
  }
}
