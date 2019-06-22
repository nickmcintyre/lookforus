import { expect } from 'chai';

import './api/organisms';


describe('lookforus', function () {
  it('package.json has correct name', async function () {
    const { name } = await import('../package.json');
    expect(name).to.equal('lookforus');
  });

  if (Meteor.isClient) {
    it('client is not server', function () {
      expect(Meteor.isServer).to.be.false;
    });
  }

  if (Meteor.isServer) {
    it('server is not client', function () {
      expect(Meteor.isClient).to.be.false;
    });
  }
});
