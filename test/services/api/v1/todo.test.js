const app = require('../../../../src/app');

describe('\'api/v1/todo\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/todo');
    expect(service).toBeTruthy();
  });
});
