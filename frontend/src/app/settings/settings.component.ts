import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor() { }
  
  @Input()
  bookmarkedCourses: any[] = [];

  @Input()
  user: SocialUser = new SocialUser;

  // Method to remove a course from the bookmark list
  removeBookmark(course: any): void {
    this.bookmarkedCourses = this.bookmarkedCourses.filter(
      (item: any) => item.id !== course.id
    );
    // Send an http request to the server to remove the course from the bookmark list
    // Remove the users firestore id and the course id and the course title and the course name
    // from the database
  }
}
