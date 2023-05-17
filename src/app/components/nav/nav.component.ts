import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeetService } from 'src/app/services/leet.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit{
  isLogged: boolean = this.leetService.isLogged();
  userHash!: string;
  constructor(private leetService: LeetService, private router: Router) {}

  ngOnInit(): void {
    this.leetService.getUserDetails().subscribe({
      next: (v) => {
          this.userHash = v.id;
      },
      error: (e: HttpErrorResponse) => {
        if (e.status === 401) {
          this.router.navigate(['login']);
        }
      },
    });
  }

}
