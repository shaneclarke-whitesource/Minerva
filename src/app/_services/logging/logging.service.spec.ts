import { TestBed } from '@angular/core/testing';

import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service:LoggingService;
  beforeEach(() => 
  TestBed.configureTestingModule({})  
  );

  it('should be created', () => {
    const service: LoggingService = TestBed.get(LoggingService);
    expect(service).toBeTruthy();
  });

  it('should set the log level', () => {
    const service: LoggingService = TestBed.get(LoggingService);
    service.setLevel(0);
    expect(localStorage.getItem('LOG_LEVEL')).toEqual('0');
  });

  it('should get the log level', () => {
    const service: LoggingService = TestBed.get(LoggingService);
    var level = service.getLevel();
    expect(level).toEqual('0');
  });

  it('should log a message to the console', () => {
    const service: LoggingService = TestBed.get(LoggingService);
    var consoleSpy = spyOn(console, 'log');
    service.log('test', 1);
    expect(consoleSpy).toHaveBeenCalled();
  });
  it('should log a Error message to the console and set Alert message', () => {
    const service: LoggingService = TestBed.get(LoggingService);
    service.logLevel=3;      
    var consoleSpy = spyOn(console, 'log');      
    service.log('error', 3);
    expect(consoleSpy).toHaveBeenCalled();
  });
  it('Set Alert message', () => {
    const service: LoggingService = TestBed.get(LoggingService);    
    service.getAlertMsg().subscribe(mes =>{
      expect(mes).toBe(undefined);
    });
    
  });
});
