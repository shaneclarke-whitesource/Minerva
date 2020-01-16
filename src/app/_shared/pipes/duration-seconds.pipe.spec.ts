import { DurationSecondsPipe } from './duration-seconds.pipe';

describe('DurationSecondsPipe', () => {
  let pipe: DurationSecondsPipe;

  beforeEach(() => {
    pipe = new DurationSecondsPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('convert ISO-8601 duration to seconds', () => {
    let duration = "PT2M30S";
    expect(pipe.transform(duration)).toEqual(150);
  })
});
