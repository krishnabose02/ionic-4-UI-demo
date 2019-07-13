import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dummy-module',
  templateUrl: './dummy-module.page.html',
  styleUrls: ['./dummy-module.page.scss'],
})
export class DummyModulePage implements OnInit {
subjectHead: string;
  constructor(public router: ActivatedRoute) { }

  ngOnInit() {
    this.subjectHead = this.router.snapshot.paramMap.get('id');
  }

}
