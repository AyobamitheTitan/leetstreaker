import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StreakResponse } from 'src/app/interfaces/streak-response';
import { LeetService } from 'src/app/services/leet.service';

import {
  faFire,
  faMessage,
  faUser,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public streakResponse: StreakResponse = {
    maxStreak: 0,
    streak: 0,
    message: '',
    error: '',
    positive: true,
  };

  public fireStyle!: Object;
  public location: string = '';

  public faMessage = faMessage;
  public faFire = faFire;
  public faUser = faUser;
  public faTimes = faTimes;

  constructor(private leetService: LeetService, private router: Router) {}

  ngOnInit(): void {
    this.leetService.getStreak().subscribe({
      next: (v: StreakResponse) => {
        console.log(v);
        this.streakResponse = v;
        this.fireStyle = {
          burning: this.streakResponse.streak > 0,
        };
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);

        if (err.status === 401) {
          this.router.navigate(['login']);
        }
      },
    });
  }

  changeLocation(where: string) {
    switch (where) {
      case 'FRIENDS':
        this.location = 'FRIENDS';
        break;
      case 'MESSAGES':
        this.location = 'MESSAGES';
        break;
      default:
        this.location = 'MESSAGES';
    }
  }

  keepStreak() {
    this.leetService.startStreak().subscribe({
      next: (v) => {
        this.streakResponse = v;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.streakResponse = err.error;
      },
    });
  }

  closeError() {
    this.streakResponse.error = '';
  }
}
