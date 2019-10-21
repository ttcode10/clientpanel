import { SettingsService } from './../../services/settings.service';
import { Settings } from './../../models/Settings';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/Clients';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  settings: Settings;

  disableBalanceOnAdd: boolean;

  @ViewChild('clientForm', {'static': true}) form: any;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if(!valid) {
      // Show error
      this.flashMessagesService.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add new client
      this.clientService.addClient(value);

      // Show message
      this.flashMessagesService.show('New client added', {
        cssClass: 'alert-success', timeout: 4000
      });

      // Redirect to dashboard
      this.router.navigate(['/']);

    }
  }




}
