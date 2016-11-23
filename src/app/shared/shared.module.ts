import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListItemComponent } from './list-item.component';

const COMPONENTS = [
    ListItemComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        ...COMPONENTS
    ],
    declarations: [
        ... COMPONENTS
    ],
    providers: [],
})
export class SharedModule { }
