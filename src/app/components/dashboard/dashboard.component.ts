import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StreakResponse } from 'src/app/interfaces/streak-response';
import { LeetService } from 'src/app/services/leet.service';

import { faFire, faMessage } from '@fortawesome/free-solid-svg-icons';
import { Where } from 'src/app/interfaces/where';

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

  public fireStyle = {
    'burning':this.streakResponse.streak,
  }
  public location: string = '';

  public faMessage = faMessage;
  public faFire = faFire;

  constructor(private leetService: LeetService, private router: Router) {}

  ngOnInit(): void {
    // this.leetService.getStreak().subscribe({
    //   next: (v: StreakResponse) => {
    //     console.log(v);
    //     this.streakResponse = v;
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     if (err.status === 401) {
    //       this.router.navigate(['login']);
    //     }
    //   },
    // });
  }


  changeLocation(where: string) {
    switch (where) {
      case 'FRIENDS':
        this.location = 'FRIENDS';
        break
      case 'MESSAGES':
        this.location = 'MESSAGES';
        break
      default:
        this.location = 'MESSAGES'
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
}
