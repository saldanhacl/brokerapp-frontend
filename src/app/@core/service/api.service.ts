import { Injectable } from '@angular/core';
import {ExternalConfiguration, ExternalConfigurationHandlerInterface} from 'angular4-hal';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService implements ExternalConfigurationHandlerInterface {
  constructor(private http: HttpClient) {
  }

  deserialize(): any {
  }

  getExternalConfiguration(): ExternalConfiguration {
    return undefined;
  }

  getHttp(): HttpClient {
    return this.http;
  }

  getProxyUri(): string {
    return 'http://localhost:8080/';
  }

  getRootUri(): string {
    return 'http://localhost:8080/';
  }

  serialize(): any {
  }

  setExternalConfiguration(externalConfiguration: ExternalConfiguration): any {
  }

}
