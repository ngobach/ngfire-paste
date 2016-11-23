import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import { Router } from '@angular/router';

interface Link {
  title: string;
  target: string[];
}

const NAVBAR_LINKS: Link[] = [
  { title: 'Home', target: ['home'] },
  { title: 'Create', target: ['create'] },
  { title: 'List', target: ['list'] },
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  links: Link[] = NAVBAR_LINKS;
  auth: FirebaseAuth;
  user: any;

  constructor(af: AngularFire, private router: Router) {
    this.auth = af.auth;
  }

  ngOnInit() {
    this.auth.subscribe((state) => this.user = state ? state.facebook : null);
  }

  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
