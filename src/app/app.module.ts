import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchSettingsComponent } from './search-settings/search-settings.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { CourseComponent } from './course/course.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    SearchSettingsComponent,
    UserSettingsComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
