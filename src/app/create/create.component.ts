import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';

import * as Lang from '../paste/languages';
import { Paste } from '../paste/paste';
import { PasteService } from '../paste/paste.service';

@Component({
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit, OnDestroy {
  _userRef: Subscription;

  busy: boolean;
  langs: Lang.Language[];

  pasteId: string;
  content: string = '';
  name: string = '';
  lang: string = Lang.getDefault();
  editMode = false;

  loginState: any;
  constructor(
    private pasteService: PasteService,
    private router: Router,
    private af: AngularFire,
    private route: ActivatedRoute,
    title: Title) {
      title.setTitle('Create paste');
  }

  ngOnInit() {
    this.busy = false;
    this.langs = Lang.LANGS;
    this._userRef = this.af.auth.subscribe(state => this.loginState = state);
    this.route.params.subscribe(params => {
      if (params['id']) {
          this.pasteService.getPaste(params['id']).then(paste => {
            this.editMode = true;
            this.pasteId = params['id'];
            this.name = paste.title;
            this.content = paste.content;
            this.lang = paste.lang;
          });
      } else {
          this.editMode = false;
          this.pasteId = null;
          this.name = '';
          this.content = '';
          this.lang = Lang.getDefault();
      }
    });
  }

  ngOnDestroy() {
    this._userRef.unsubscribe();
  }

  create() {
    if (!this.loginState) {
      alert('Chưa đăng nhập!');
      return;
    }

    // Change default languages
    Lang.setDefault(this.lang);

    this.busy = true;
    const paste: Paste = {
      content: this.content,
      title: this.name,
      lang: this.lang,
      owner: this.loginState.uid,
      createdAt: new Date().getTime()
    };

    if (!this.editMode) {
      this.pasteService.createPaste(paste).then(id => {
        this.router.navigate(['/view', id]);
      });
    } else {
      this.pasteService.updatePaste(this.pasteId, paste).then(() => {
        this.router.navigate(['/view', this.pasteId]);
      });
    }
  }

  isValid() {
    return this.content && this.name && this.content.length > 0 && this.name.length > 0;
  }
}
