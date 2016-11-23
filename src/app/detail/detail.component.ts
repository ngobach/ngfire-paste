import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';

import { Paste } from '../paste/paste';
import { PasteService } from '../paste/paste.service';
import { getLang } from '../paste/languages';

import * as hljs from 'highlightjs';
import * as ClipBoard from 'clipboard';
import * as $ from 'jquery';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {
  private _rendered: string;
  paste: Paste;
  clipboard: ClipBoard;
  copied: boolean;
  isOwner: boolean;

  constructor(
    private elem: ElementRef,
    private route: ActivatedRoute,
    private service: PasteService,
    private af: AngularFire,
    private router: Router) { }

  ngOnInit() {
    this.service.getPaste(this.route.snapshot.params['id']).then(x => {
      this.paste = x;
      setTimeout(() => {
        const pre = $(this.elem.nativeElement).find('div.nano');
        pre.nanoScroller();
      }, 1);
      this.af.auth.subscribe(state => {
        this.isOwner = state && state.uid === x.owner;
      });
    });
  }

  ngAfterViewInit() {
    this.clipboard = new ClipBoard(this.elem.nativeElement.querySelector('.button-copy') , { text: () => this.paste.content });
  }

  ngOnDestroy() {
    this.clipboard.destroy();
  }

  content() {
    if (!this._rendered) {
      try {
        this._rendered = hljs.highlight(this.paste.lang, this.paste.content, false).value;
      } catch (exc) {
        this._rendered = this.paste.content.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
          return '&#' + i.charCodeAt(0) + ';';
        });
      }
    }
    return this._rendered;
  }

  langName() {
    return getLang(this.paste.lang).title;
  }

  onCopy() {
    this.copied = true;
    setTimeout(() => this.copied = false, 1000);
  }

  delete() {
    return this.service.deletePaste(this.route.snapshot.params['id']).then(res => this.router.navigate(['/home']));
  }
}
