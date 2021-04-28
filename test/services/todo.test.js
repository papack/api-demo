const app = require('../../src/app');

describe('\'todo\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/todo');
    expect(service).toBeTruthy();
  });
});
