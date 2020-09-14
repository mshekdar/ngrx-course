import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { CourseActions } from './action-types';
import { CoursesHttpService } from './services/courses-http.service';

@Injectable()
export class CorsesEffects {

  loadCourses$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CourseActions.loadAllCourses),
        concatMap(action => {
          return this.coursesHttpService.findAllCourses();
        }),
        map(courses => CourseActions.allCoursesLoaded({ courses }))
      )
    }
  )

  saveCourse$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap(action => {
          return this.coursesHttpService.saveCourse(action.update.id, action.update.changes);
        })
      )
    },
    // No further action dispatch
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService
  ) { }

}
