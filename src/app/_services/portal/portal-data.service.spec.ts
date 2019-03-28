import { TestBed } from '@angular/core/testing';

import { PortalDataService } from './portal-data.service';

describe('PortalDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortalDataService = TestBed.get(PortalDataService);
    expect(service).toBeTruthy();
  });

  describe('Check IPortalData properties', () => {
    it('should have a user id', () => {
      const service: PortalDataService = TestBed.get(PortalDataService);
      expect(service.portalData.userId).toEqual(838277821972);
    });

    it('should have a domian id', () => {
      const service: PortalDataService = TestBed.get(PortalDataService);
      expect(service.portalData.domainId).toEqual('833544');
    });

    it('should have a username', () => {
      const service: PortalDataService = TestBed.get(PortalDataService);
      expect(service.portalData.username).toEqual('conwaytwitty');
    });

    it('should have a tenants', () => {
      const service: PortalDataService = TestBed.get(PortalDataService);
      expect(service.portalData.tenants).toEqual(['cloud:833544']);
    });
  });

});
