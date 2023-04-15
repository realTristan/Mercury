import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  // Input Course
  @Input()
  course: any = {};
  
  // Method to return an empty space string
  emptySpace(amount: number): string {
    return "‏‏‎ ‎".repeat(amount)
  }

  // Method to add the course to the bookmark list
  bookmark(course: any): void {
    let course_title: string = course.title;
    let course_name: string = course.name;
    let course_id: string = course.id;
    // Send an http request to the server to add the course to the bookmark list
    // Add the users firestore id and the course id and the course title and the course name
    // to the database
  }
}
