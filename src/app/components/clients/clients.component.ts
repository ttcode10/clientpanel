import { ClientService } from './../../services/client.service';
import { Client } from './../../models/Clients';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  client: Client;
  totalOwed: number;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    })
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + client.balance;
    }, 0);
  }


}
