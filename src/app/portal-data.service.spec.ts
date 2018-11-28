import { TestBed } from '@angular/core/testing';

import { PortalDataService } from './portal-data.service';
import { AppModuleMock } from './app.module.mock';

Window['PORTAL_DATA'] = new AppModuleMock().mock

describe('PortalDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortalDataService = TestBed.get(PortalDataService);
    expect(service).toBeTruthy();
  });

  it('should have a domian id', () => {
    const service: PortalDataService = TestBed.get(PortalDataService);
    expect(service.domainId).toEqual('833544');
  })
});
