import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignupComponent } from './components/signup/signup.component';
import { NavComponent } from './components/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FriendsComponent } from './components/friends/friends.component';
import { FriendComponent } from './components/friend/friend.component';
import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './components/messages/messages.component'

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavComponent,
    LoginComponent,
    DashboardComponent,
    FriendsComponent,
    FriendComponent,
    MessageComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
