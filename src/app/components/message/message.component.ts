import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Messages } from 'src/app/interfaces/messages';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message!: Messages
  @Output() accept = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  onAccept(){
    this.accept.emit(this.message.secondary)
  }
}
