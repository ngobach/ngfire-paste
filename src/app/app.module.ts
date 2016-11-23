import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

import { PasteService } from './paste/paste.service';
import { AuthGuard } from './auth/auth-guard.service';

import * as firebaseConfig from './firebase.config';

const ROUTES: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  {path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  {path: 'list', component: ListComponent },
  {path: 'view/:id', component: DetailComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    HomeComponent,
    DetailComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    SharedModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig.CONFIG, firebaseConfig.AUTH),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    Title,
    PasteService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
