import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { noop } from "rxjs";

import { AuthService } from "../auth.service";
import { AppState } from 'app/reducers';
import { AuthActions } from '../action-types';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    const loginInfo = this.form.value;
    this.auth.login(loginInfo.email, loginInfo.password)
      .pipe(
        tap(user => {
          console.log(user);
          this.store.dispatch(AuthActions.login({ user }))
          this.router.navigateByUrl('/courses')
        })
      )
      .subscribe(
        noop,
        () => alert('Login failed!')
      )
  }

}

