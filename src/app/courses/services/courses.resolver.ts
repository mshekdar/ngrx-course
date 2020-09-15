import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { CourseEntityService } from './course-entity.service';
import { CoursesDataService } from './courses-data.service';

@Injectable()
export class CourseResolver implements Resolve<boolean> {
  constructor(private courseEntityService: CourseEntityService) {
    // Do nothing
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.courseEntityService.loaded$.pipe(
      // Get courses if not loaded
      tap(loaded => {
        if (!loaded) {
          this.courseEntityService.getAll();
        }
      }),
      // Emmit true only when loaded
      filter(loaded => !!loaded),
      // Complete observable after first emission
      first()
    )
  }

}
