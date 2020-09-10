import { createSelector } from "@ngrx/store";
import { AuthState } from "../auth/reducers/index";

export const isLoggedIn = createSelector(
  (appState) => appState['auth'],
  (authState: AuthState) => !!authState.user,
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  (isLoggedIn) => !isLoggedIn,
);
