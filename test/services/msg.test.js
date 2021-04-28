const app = require('../../src/app');

describe('\'msg\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/msg');
    expect(service).toBeTruthy();
  });
});
