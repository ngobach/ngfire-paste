import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

import { Language, LANGS } from '../paste/languages';
import { PasteService } from '../paste/paste.service';

@Component({
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
  busy: boolean;
  langs: Language[];

  content: string = '';
  name: string = '';
  lang: string = LANGS.find(x => x.default).short;

  constructor(private pasteService: PasteService, private router: Router, private af: AngularFire) {}

  ngOnInit() {
    this.busy = false;
    this.langs = LANGS;
  }

  create() {
    this.af.auth.subscribe(state => {
      if (!state) {
        return;
      }
      this.busy = true;
      this.pasteService.createPaste({
        content: this.content,
        title: this.name,
        lang: this.lang,
        owner: state.uid,
        createdAt: new Date().getTime()
      }).then(id => {
        this.router.navigate(['/view', id]);
      });
    })
  }

  isValid() {
    return this.content.length > 0 && this.name.length > 0;
  }
}
