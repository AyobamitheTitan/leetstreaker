import { Component, OnInit } from '@angular/core';
import { LeetService } from 'src/app/services/leet.service';
import { faSearch, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  public hash!: string;

  show: boolean = false;
  constructor(public leetService: LeetService) {}
  public users!: Array<any>;
  public my_friends!: Array<any>;

  faSearch = faSearch;
  faPlus = faPlus;
  faTimes = faTimes;
  public addStatus!: string;

  ngOnInit(): void {
    this.leetService.myFriends().subscribe({
      next: (v) => {
        this.my_friends = v.friends;
        console.log(v.friends);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  addFriend(hashId: string) {
    console.log(hashId);

    this.leetService.makeFriends(hashId).subscribe({
      next: (v) => {
        this.addStatus = v.message;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  findUser() {
    this.leetService.getUsers(this.hash).subscribe({
      next: (v) => {
        this.show = true;
        this.users = v.users;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  toggleShow() {
    this.show = !this.show;
  }

  deleteAddStatus(){
    this.addStatus = ''
  }
}
