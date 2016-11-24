import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';

import { Paste } from '../paste/paste';
import { PasteService } from '../paste/paste.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {
  items: FirebaseListObservable<Paste[]>;
  _sub: Subscription;
  loaded: boolean = false;

  constructor(private pasteService: PasteService, title: Title) {
    title.setTitle('Danh sách các pastes');
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  ngOnInit() {
    this.items = this.pasteService.getPastes({limitToFirst: 100});
    this._sub = this.items.subscribe(x => {
      this.loaded = true;
    });
  }
}
