import { Component, OnInit } from '@angular/core';
import { RegisterService } from './services/register.service';
import { LeetService } from './services/leet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor(public leetService:LeetService,public router:Router){}

  ngOnInit(): void {
  }

}
