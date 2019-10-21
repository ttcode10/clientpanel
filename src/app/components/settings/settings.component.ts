import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from './../../services/settings.service';
import { Settings } from './../../models/Settings';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    console.log(this.settings);
    this.settingsService.saveSettings(this.settings);
    this.flashMessagesService.show('Settings saved', {
      cssClass: 'alert-success',
      timeout: 4000
    });
  }

}
