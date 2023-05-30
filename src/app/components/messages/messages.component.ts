import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/interfaces/messages';
import { LeetService } from 'src/app/services/leet.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public messages!:Array<Messages>
  public response:string = ''

  faTimes = faTimes
  constructor(private leetService:LeetService) { }

  ngOnInit(): void {
    this.leetService.myMessages().subscribe({
      next:(n)=>{
        console.log(n.messages);
        this.messages = n.messages
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  clearResponse(){
    this.response = ''
  }

  addFriend(hash:string){
    this.leetService.addFriend(hash).subscribe({
      next:(v)=>{
        this.response = v.message
      },error:(err)=>{
        console.log(err);
      }
    })
  }
}
