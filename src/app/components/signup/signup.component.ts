import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from 'src/app/interfaces/response';
import { User } from 'src/app/interfaces/user';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public response!: Response|null;
  public buttonHolder:string = "Sign up"
  public loading:boolean = false

  constructor(private registerService: RegisterService,private router:Router) {}

  ngOnInit(): void {}

  public formGroup: FormGroup = new FormGroup<User>({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  onSubmit() {
    this.response = null
    this.buttonHolder = "Loading"
    this.loading = true
    console.log(this.formGroup.value);

    this.registerService.createUser(this.formGroup.value).subscribe({
      next: (v) => {
        this.loading = false
        this.response = v;
        const token = {
          token: this.response.token,
          expiry: new Date(Date.now() + 24 * 60 * 60 * 100),
        };
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('username',this.response.username as string)
        this.router.navigate([''],{skipLocationChange:true})
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        localStorage.clear()
        this.buttonHolder = "Sign up"
        this.response = e.error;
      },
    });
  }
}
