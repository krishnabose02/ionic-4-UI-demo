import { Component, OnInit } from '@angular/core';
import { File, Entry } from '@ionic-native/file/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.page.html',
  styleUrls: ['./doc-list.page.scss'],
  providers: [File, DocumentViewer]
})
export class DocListPage implements OnInit {
  subscription: any;
  rawData: string;
  currentFiles: any[];
  class: string;
    constructor(public location: Location,
                public platform: Platform,
                private file: File,
                private document: DocumentViewer) {
      this.platform.ready().then(() => {
        this.rawData = '';
        this.readFiles('Download');
      }).catch((err) => {
        this.rawData = 'Files cannot be displayed as platform does not support the operation (' + err + ')';
        // alert('platform not ready');
        console.log('platform error: ' + err);

        this.currentFiles = [];
      });
    }

    readFiles(folder: string) {
      // the code below is correct, above one if any should be removed
      this.file.listDir(this.file.externalRootDirectory, folder).then((res) => {
        this.rawData = '';
        res = this.filterFiles(res);
        this.currentFiles = res;
        if (this.currentFiles === []) {
          this.rawData = 'No files found to play!';
        }
        console.log(this.rawData);
        console.log(res);
      }).catch(err => {
        alert('error in readFiles ' + err);
        this.rawData = 'error...' + err;
        console.log(err);
      });
    }

    displayDocument(f: Entry) {
      // f.nativeURL
      const options: DocumentViewerOptions = {
        title: 'thinkzone'
      };

      this.document.viewDocument(f.nativeURL, 'application/pdf', options);
    }
    filterFiles(currentFiles) {
      // this function can be used for selecting which files to play and which to not
      // presently folders and files with extention other than common video types have been removed

      const extensions = ['pdf']; // add necessary extensions here
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
