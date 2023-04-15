import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from './environments/environment';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { Bookmarks } from './lib/bookmarks';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScrollingModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  providers: [
    Bookmarks,
    {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [{
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.GOOGLE_AUTH_CLIENT_ID)
      }],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
