import { Component } from '@angular/core';

@Component({
  selector: 'app-search-settings',
  templateUrl: './search-settings.component.html',
  styleUrls: ['./search-settings.component.css']
})
export class SearchSettingsComponent {
  // Constructor
  constructor() { }

  // OnSubmit the search settings
  onSubmit = (timespan: string, excludeWebsite: string, excludeWord: string) => {
    console.log(timespan, excludeWebsite, excludeWord);
  }
}
