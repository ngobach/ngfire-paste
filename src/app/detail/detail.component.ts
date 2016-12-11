import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import { AngularFire } from 'angularfire2';
import * as hljs from 'highlightjs';
import * as ClipBoard from 'clipboard';
import * as $ from 'jquery';

import { Paste } from '../paste/paste';
import { PasteService } from '../paste/paste.service';
import { getLang } from '../paste/languages';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {
  private _rendered: string;
  private _authRef: Subscription;
  paste: Paste;
  clipboard: ClipBoard;
  copied: boolean;
  isOwner: boolean;

  constructor(
    private elem: ElementRef,
    private route: ActivatedRoute,
    private service: PasteService,
    private af: AngularFire,
    private router: Router,
    private title: Title) { }

  ngOnInit() {
    this.service.getPaste(this.route.snapshot.params['id']).then(x => {
      this.paste = x;
      this.title.setTitle(x.title);

      setTimeout(() => {
        const pre = $(this.elem.nativeElement).find('div.nano');
        pre.nanoScroller();
      }, 1);

      this._authRef = this.af.auth.subscribe(state => {
        this.isOwner = state && state.uid === x.owner;
      });
    });
  }

  ngAfterViewInit() {
    this.clipboard = new ClipBoard(this.elem.nativeElement.querySelector('.button-copy') , { text: () => this.paste.content });
  }

  ngOnDestroy() {
    this.clipboard.destroy();
    this._authRef.unsubscribe();
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

  edit() {
    this.router.navigate(['/create', {id: this.route.snapshot.params['id']}]);
  }
}
