import { SettingsService } from './../../services/settings.service';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/Clients';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
SettingsService

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };


  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  disableBalanceOnEdit: boolean;

  @ViewChild('clientForm', {'static': true}) form: any;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(this.disableBalanceOnEdit) {
      value.balance = 0;
    }

    if(!valid) {
      // Show error
      this.flashMessagesService.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add id to client
      value.id = this.id;

      // Update client
      this.clientService.updateClient(value);

      // Show message
      this.flashMessagesService.show('Client updated', {
        cssClass: 'alert-success', timeout: 4000
      });

      // Redirect to dashboard
      this.router.navigate(['/client/'+this.id]);

    }
  }

}