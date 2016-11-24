import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate {
    private redirectUrl: string;

    constructor(
        private router: Router,
        private af: AngularFire
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return new Promise(res => {
            const sub = this.af.auth.subscribe(data => {
                res(data);
                sub.unsubscribe();
            });
        }).then(x => !!x).then(loggedIn => {
            if (!loggedIn) {
                alert('Vui lòng đăng nhập');
                this.af.auth.login();
                const sub = this.af.auth.subscribe(res => {
                    if (res && this.redirectUrl) {
                        this.router.navigateByUrl(this.redirectUrl);
                        this.redirectUrl = null;
                    }
                    sub.unsubscribe();
                });
                this.router.navigate(['/']);
                this.redirectUrl = state.url;
            }
            return loggedIn;
        });
    }
}