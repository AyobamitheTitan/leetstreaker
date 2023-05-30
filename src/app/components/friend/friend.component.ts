import { Component, Input, OnInit } from '@angular/core';
import { LeetService } from 'src/app/services/leet.service';
import {faFire} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
})
export class FriendComponent implements OnInit {
  @Input() friend!: any;
  streak!: Number;

  faFire = faFire;

  public fireStyle = {
    'burning': this.streak,
  };
  constructor(private leetService: LeetService) {}

  ngOnInit(): void {
    this.leetService.getUserDetails().subscribe({
      next: (n) => {
        this.streak = n.streak;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
