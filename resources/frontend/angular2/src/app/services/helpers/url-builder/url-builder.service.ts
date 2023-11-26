import { Injectable } from '@angular/core';
import {PlatformLocation} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {

    public base_url: string = '';
    public api_url: string = '';

  constructor(
      private platform_location: PlatformLocation,
  ) {
        this.base_url = this.platform_location.protocol + '//' + this.platform_location.hostname;
        this.api_url = this.base_url + '/api'
  }
}
