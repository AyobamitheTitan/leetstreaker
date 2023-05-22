import { Component, OnInit } from '@angular/core';
import { LeetService } from 'src/app/services/leet.service';
import { faSearch,faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  public hash!:string
  constructor(public leetService:LeetService) { }
  public users!:Array<any>

  faSearch=faSearch
  faPlus= faPlus
  public addStatus!:string

  ngOnInit(): void {
  }

  addFriend(hashId:string){
    console.log(hashId);

    this.leetService.makeFriends(hashId).subscribe({
      next:(v)=>{
        this.addStatus = v.message
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  findUser(){
    this.leetService.getUsers(this.hash).subscribe({
      next:(v)=>{
        console.log(v);
        this.users = v.users
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }
}
