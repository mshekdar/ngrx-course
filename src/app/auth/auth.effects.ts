import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { AuthActions } from "./action-types";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {
    actions$.subscribe(action => {
      if (action.type === '[Login page] User Login') {
        localStorage.setItem('user', JSON.stringify(action['user']));
      }
    })
  }

}
