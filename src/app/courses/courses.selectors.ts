import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCoursesReducer from "./reducers/course.reducers";

export const selectCoursesFeature = createFeatureSelector<fromCoursesReducer.CourseState>('courses');

export const selectAllCourses = createSelector(
  selectCoursesFeature,
  fromCoursesReducer.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);

