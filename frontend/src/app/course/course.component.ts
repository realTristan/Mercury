import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { Bookmarks } from '../lib/bookmarks';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  // Input Variables
  @Input()
  course: any;
  @Input()
  user: SocialUser = new SocialUser;
  
  // Constructor
  constructor(public bookmarks: Bookmarks) {}
  
  // Method to return an empty space string
  emptySpace(amount: number): string {
    return "‏‏‎ ‎".repeat(amount)
  }
}
