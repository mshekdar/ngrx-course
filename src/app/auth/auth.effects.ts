import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthActions } from "./action-types";

@Injectable()
export class AuthEffects {

  /**
   * Login effect to save user to localstorage
   */
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      tap((action) => localStorage.setItem('user', JSON.stringify(action.user)))
    )},
    // No further action dispatch
    { dispatch: false }
  );

  constructor(private actions$: Actions) { }

}
