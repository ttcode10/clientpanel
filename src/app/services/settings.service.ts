import { Settings } from './../models/Settings';
import { Injectable } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  }

  constructor() {
    if(localStorage.getItem('settings') !== null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings() {
    return this.settings;
  }

  saveSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }

}
