import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthActions } from "./action-types";

@Injectable()
export class AuthEffects {

  /**
   * Login effect to save user to localstorage
   */
  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) => localStorage.setItem('user', JSON.stringify(action.user)))
      )
    },
    // No further action dispatch
    { dispatch: false }
  );

  /**
   * Logout effect to remove user from localstorage
   */
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        })
      )
    },
    // No further action dispatch
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) { }

}
