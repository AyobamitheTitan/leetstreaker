import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeetService } from 'src/app/services/leet.service';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  public isLogged = this.router.url === '/' && localStorage.getItem('username');
  public userHash!: string;

  faRoll = faArrowRotateLeft;
  constructor(private leetService: LeetService, private router: Router) {}

  ngOnInit(): void {
    this.getHash()
  }

  getHash() {
    if (!localStorage.getItem('hashID')) {
      this.leetService.getUserDetails().subscribe({
        next: (v) => {
          this.userHash = v.id;
          localStorage.setItem('hashID',v.id)
          return
        }
      });
    }
    this.userHash = localStorage.getItem('hashID') as string
  }
}
