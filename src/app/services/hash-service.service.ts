import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HashServiceService {

  data = new EventEmitter()
  constructor() { }

  sendHash(hashData:string){
    this.data.emit(hashData)
  }
}
