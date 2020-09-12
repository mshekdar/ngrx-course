import { Course } from "../model/course";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";

export interface CourseState extends EntityState<Course> {

}

export const adapter = createEntityAdapter<Course>();

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(

  initialCoursesState,

  on(CourseActions.allCoursesLoaded, (state, action) => {
    return adapter.addAll(action.courses, state)
  }),
);

export const { selectAll } = adapter.getSelectors();

