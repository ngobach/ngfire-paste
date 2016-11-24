import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FirebaseListObservable } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';
import { Paste } from '../paste/paste';
import { PasteService } from '../paste/paste.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  items: FirebaseListObservable<Paste[]>;
  _sub: Subscription;
  loaded: boolean = false;
  blank: boolean;

  constructor(private title: Title, private pasteService: PasteService) { }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  ngOnInit() {
    this.title.setTitle('Just paste here!');
    this.items = this.pasteService.getPastes({ limitToFirst: 10 });
    this._sub = this.items.subscribe(x => {
      this.loaded = true;
      this.blank = !x.length;
    });
  }
}
