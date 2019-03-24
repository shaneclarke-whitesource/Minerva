import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortalDataService {
  
  domainId: string;
  userId: string;
  username: string;
  tenants: [];

  constructor() { 
    this.domainId = Window['PORTAL_DATA'].domainId || null;
    this.userId = Window['PORTAL_DATA'].userId || null;
    this.username = Window['PORTAL_DATA'].username || null;
    this.tenants = Window['PORTAL_DATA'].tenants || null;
  }
}
