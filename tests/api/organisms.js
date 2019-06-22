import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'chai';
import moment from 'moment';

import Organisms from '/imports/api/organisms';


if (Meteor.isServer) {
  describe('Organisms', function () {
    describe('methods', function () {
      const oldUserId = Random.id();
      const newUserId = Random.id();
      let oldOrganism;
      let newOrganism;

      beforeEach(function () {
        Organisms.remove({});
        const now = moment().valueOf();
        oldOrganism = Organisms.insert({
          skeletons: [
            { head: 1, shoulders: 2 },
            { knees: 3, toes: 4 },
            { knees: 5, toes: 6 },
          ],
          userId: oldUserId,
          createdAt: now - 60000,
        });
        newOrganism = Organisms.insert({
          skeletons: [
            { head: 7, shoulders: 8 },
            { knees: 9, toes: 10 },
            { knees: 11, toes: 12 },
          ],
          userId: newUserId,
          createdAt: now + 60000,
        });
      });

      it('prunes old organisms', function () {
        const pruneSelf = Meteor.server.method_handlers['organisms.prune'];
        const invocation = null;
        pruneSelf.apply(invocation, [oldOrganism]);
        pruneSelf.apply(invocation, [newOrganism]);
        expect(Organisms.find({}).count()).to.equal(1);
      });

      it('cleans up on disconnect', function () {
        const removeSelf = Meteor.server.method_handlers['organisms.disconnect'];
        const invocation = null;
        removeSelf.apply(invocation, [oldOrganism]);
        removeSelf.apply(invocation, [newOrganism]);
        expect(Organisms.find({}).count()).to.equal(0);
      });
    });
  });
}
