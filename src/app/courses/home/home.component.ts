import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from "rxjs";
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CourseState } from '../reducers/course.reducers';
import { select, Store } from '@ngrx/store';
import * as coursesSelectors from '../courses.selectors';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private dialog: MatDialog, private store: Store<CourseState>) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.store.pipe(select(coursesSelectors.selectAllCourses));
    this.advancedCourses$ = this.store.pipe(select(coursesSelectors.selectAdvancedCourses));
    this.promoTotal$ = this.store.pipe(select(coursesSelectors.selectPromoTotal));
  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
