import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  showRegister: boolean = true;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  onSubmit() {
    console.log(this.email, this.password);
    this.authService.register(this.email, this.password)
      .then(res => {
        this.flashMessage.show('You are now registered and logged in', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/']);
        this.showRegister = false;
      })
      .catch(err => {
        this.flashMessage.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
      })
  }

}
