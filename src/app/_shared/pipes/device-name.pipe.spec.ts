import { DeviceNamePipe } from './device-name.pipe';

describe('DeviceNamePipe', () => {
  let pipe: DeviceNamePipe;

  beforeEach(() => {
    pipe = new DeviceNamePipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('removes quotes from string', () => {
    expect(pipe.transform('"339064-db3.humaniplex.com"'))
    .toEqual('339064-db3.humaniplex.com');
  })
});
