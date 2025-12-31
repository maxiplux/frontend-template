import * as constants from './index';

describe('ConstantsBarrel', () => {
  it('should export all tokens and types', () => {
    expect(constants.SLATE).toBeDefined();
    expect(constants.SKY).toBeDefined();
    expect(constants.ORANGE).toBeDefined();
    expect(constants.DEFAULT_COLOR_CONFIG).toBeDefined();
  });
});
