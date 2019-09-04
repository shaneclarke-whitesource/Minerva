import { MeasurementNamePipe } from './measurement-name.pipe';

describe('MeasurementNamePipe', () => {
  let pipe: MeasurementNamePipe;

  beforeEach(() => {
    pipe = new MeasurementNamePipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert measurement', () => {
    expect(pipe.transform('ZENOSS_serverMaxConns_serverMaxConns'))
    .toEqual('serverMaxConns_serverMaxConns');
  })
});
