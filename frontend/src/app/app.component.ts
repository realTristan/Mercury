import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Bookmarks } from './lib/bookmarks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Constructor
  constructor(private authService: SocialAuthService, public bookmarks: Bookmarks) {}

  // Variables
  resultCount: number = 0;
  time: number = 0;
  courses: any[] = [];

  // Google Auth variables
  user: SocialUser = new SocialUser;
  isLoggedIn: boolean = false;

  // Google Auth Initialization
  ngOnInit(): void {
    this.authService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      this.isLoggedIn = (user != null);

      // If the user is logged in, then get their bookmarks
      if (this.isLoggedIn) {
        this.bookmarks.get(this.user.id);
      }
    });
  }

  // Method to query for courses
  query(query: string): void {
    // Check if the query is too short
    if (query.length < 3) {
      this.courses = [];
      this.resultCount = 0;
      this.time = 0;
      return;
    }

    // Fetch the courses
    fetch(`http://localhost:8000/courses?q=${query}`)
      .then(res => res.json())
      .then(res => {
        if (res.result === undefined) {
          return;
        }
        this.courses = res.result;
        this.resultCount = res.result.length;
        this.time = res.time / 1000;
      });
  }
}
