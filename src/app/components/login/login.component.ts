import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  @ViewChild('loginForm', {static: true}) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(res => {
        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.flashMessage.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
      });
  }

}


// this.authService.getAuth().subscribe(auth => {
//   if(auth) {
//     this.router.navigate(['/']);
//   }
// });