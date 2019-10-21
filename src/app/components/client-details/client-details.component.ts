import { Client } from './../../models/Clients';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      if(client != null) {
        if(client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    })
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    console.log(typeof this.client.balance);
    this.flashMessagesService.show('Balance updated successfully', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.showBalanceUpdateInput = false;
  }

  onDelete() {
    if(confirm('Are you sure?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessagesService.show('Client removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }

  }

}
