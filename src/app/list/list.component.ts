import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';

import { Paste } from '../paste/paste';
import { PasteService } from '../paste/paste.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  items: FirebaseListObservable<Paste[]>;
  loaded: boolean = false;

  constructor(private pasteService: PasteService) { }

  ngOnInit() {
    this.items = this.pasteService.getPastes({limitToFirst: 100});
    this.items.subscribe(x => {
      this.loaded = true;
    });
  }
}
