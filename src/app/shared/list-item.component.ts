import { Component, OnInit, Input } from '@angular/core';
import { Paste } from '../paste/paste';

@Component({
    selector: 'app-list-item',
    templateUrl: 'list-item.component.html'
})
export class ListItemComponent implements OnInit {
    @Input() items: Paste[];

    constructor() { }
    ngOnInit() { }
    classForLang(s: string) {
        return {
            [s]: true
        };
    }
}
