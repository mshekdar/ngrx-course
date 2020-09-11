import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { AuthActions } from './auth/action-types';
import { User } from './auth/model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router, private store: Store<AppState>) {

    }

    ngOnInit() {

      const user: User = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.store.dispatch(AuthActions.login({user}));
      }

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
      this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
      this.store.subscribe(val => {
        console.log(val);
      })
    }

    logout() {
      this.store.dispatch(AuthActions.logout());
    }

}
