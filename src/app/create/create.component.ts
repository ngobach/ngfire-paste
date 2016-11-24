import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';

import { Language, LANGS } from '../paste/languages';
import { PasteService } from '../paste/paste.service';

@Component({
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit, OnDestroy {
  _userRef: Subscription;

  busy: boolean;
  langs: Language[];

  content: string = '';
  name: string = '';
  lang: string = LANGS.find(x => x.default).short;

  loginState: any;
  constructor(private pasteService: PasteService, private router: Router, private af: AngularFire, title: Title) {
    title.setTitle('Create paste');
  }

  ngOnInit() {
    this.busy = false;
    this.langs = LANGS;
    this._userRef = this.af.auth.subscribe(state => this.loginState = state);
  }

  ngOnDestroy() {
    this._userRef.unsubscribe();
  }

  create() {
    if (!this.loginState) {
      alert('Chưa đăng nhập!');
      return;
    }

    this.busy = true;
    this.pasteService.createPaste({
      content: this.content,
      title: this.name,
      lang: this.lang,
      owner: this.loginState.uid,
      createdAt: new Date().getTime()
    }).then(id => {
      this.router.navigate(['/view', id]);
    });
  }

  isValid() {
    return this.content.length > 0 && this.name.length > 0;
  }
}
