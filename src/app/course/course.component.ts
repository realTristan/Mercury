import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  // Input Variables
  @Input()
  course: any = {};

  // Method to return an empty space string
  emptySpace(amount: number): string {
    return "‏‏‎ ‎".repeat(amount)
  }
}
