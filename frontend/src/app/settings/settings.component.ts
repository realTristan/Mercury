import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, Input } from '@angular/core';
import { Bookmarks } from '../lib/bookmarks';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  // Input Variables
  @Input()
  user: SocialUser = new SocialUser;
  
  // Constructor
  constructor(public bookmarks: Bookmarks) {
    this.bookmarks.get(this.user.id);
  }
}
