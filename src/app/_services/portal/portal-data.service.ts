import { Injectable } from '@angular/core';
import { IPortalData } from '../../_models/portalData';

@Injectable({
  providedIn: 'root'
})
export class PortalDataService {

  portalData: IPortalData;

  constructor() {
    let portal = window['PORTAL_DATA'];
    this.portalData = {
      isRacker: portal.isRacker || null,
      domainId: portal.domainId || null,
      userId: portal.userId || null,
      username: portal.username || null,
      tenants: portal.tenants || null
    }
  }
}
