import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { File, Entry } from '@ionic-native/file/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.page.html',
  styleUrls: ['./video-list.page.scss'],
  providers: [File, VideoPlayer, ScreenOrientation]
})
export class VideoListPage implements OnInit {
subscription: any;
rawData: string;
currentFiles: any[];
class: string;
  constructor(public location: Location,
              public platform: Platform,
              private file: File,
              private videoPlayer: VideoPlayer,
              private screenOrientation: ScreenOrientation) {
    this.platform.ready().then(() => {
      this.rawData = '';
      this.readFiles('thinkzone');
    }).catch((err) => {
      this.rawData = 'Files cannot be displayed as platform does not support the operation (' + err + ')';
      // alert('platform not ready');
      this.currentFiles = [];
    });
  }

  playVideo(entry: Entry) {
    this.platform.ready().then(() => {
      const prevType = this.screenOrientation.type;
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      this.videoPlayer.play(entry.nativeURL).then(() => {
        console.log('played the video');
        if (this.screenOrientation.type !== prevType) {
          this.screenOrientation.lock(prevType);
          this.screenOrientation.unlock();
        }
      }).catch((err) => {
        console.log(err);
        // alert('video playback interrupted ' + err);
        if (this.screenOrientation.type !== prevType) {
          this.screenOrientation.lock(prevType);
          this.screenOrientation.unlock();
        }
      });
    }).catch((err) => {
      alert('Cannot play video! ' + err);
    });
  }

  readFiles(folder: string) {
    // the code below is correct, above one if any should be removed
    this.file.listDir(this.file.externalRootDirectory, folder).then((res) => {
      this.rawData = '';
      res = this.filterFiles(res);
      this.currentFiles = res;
      console.log(this.rawData);
      console.log(res);
    }).catch(err => {
      alert('error in readFiles ' + err);
      this.rawData = 'error...' + err;
    });
  }

  filterFiles(currentFiles) {
    // this function can be used for selecting which files to play and which to not
    // presently folders and files with extention other than common video types have been removed

    const extensions = ['mkv', 'mp4']; // add necessary extensions here
    const newFiles: any[] = [];
    currentFiles.forEach(element => {
      const f: Entry = element;
      const ext = f.name.substring(f.name.lastIndexOf('.') + 1);
      console.log('extension found ' + ext);
      let bool = false;
      extensions.forEach(e => {
        if (e === ext) {
          bool = true;
        }
      });
      if (bool) {
        newFiles.push(f);
      }
    });
    if (newFiles === []) {
      this.rawData = 'Found no files to play!';
    }
    return newFiles;
  }
  ngOnInit() {
  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
        this.location.back();
    });
  }

  ionViewWillLeave() {
      this.subscription.unsubscribe();
  }

}
