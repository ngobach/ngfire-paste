import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FirebaseListObservable } from 'angularfire2';

import { Paste } from '../paste/paste';
import { PasteService } from '../paste/paste.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  items: FirebaseListObservable<Paste[]>;
  loaded: boolean = false;
  blank: boolean;

  constructor(private title: Title, private pasteService: PasteService) { }

  ngOnInit() {
    this.title.setTitle('PASTE.NGOBACH');
    this.items = this.pasteService.getPastes({limitToFirst: 10});
    this.items.subscribe(x => {
      this.loaded = true;
      this.blank = !x.length;
    });
  }
}
