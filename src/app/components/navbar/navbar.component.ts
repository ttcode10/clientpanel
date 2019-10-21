import { SettingsService } from './../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.settingsService.getSettings().allowRegistration
  }

  onLogOutClick() {
    this.authService.logOut();
    this.router.navigate(['/login']);
    this.flashMessagesService.show('You are now logged out', {cssClass: 'alert-success', timeout: 4000});
  }

}
