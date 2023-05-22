import { Component, OnInit } from '@angular/core';
import { LeetService } from 'src/app/services/leet.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public messages!:Array<any>
  constructor(private leetService:LeetService) { }

  ngOnInit(): void {
    this.leetService.myMessages().subscribe({
      next:(n)=>{
        console.log(n);

      },error:(err)=>{
        console.log(err);

      }
    })
  }

}
