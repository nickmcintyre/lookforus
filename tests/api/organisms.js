import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'chai';
import moment from 'moment';

import Organisms from '/imports/api/organisms';

if (Meteor.isServer) {
  describe('Organisms', () => {
    describe('methods', () => {
      const userId = Random.id();
      let organismId;

      beforeEach(() => {
        Organisms.remove({});
        organismId = Organisms.insert({
          poses: [
            { head: 1, shoulders: 2 },
            { knees: 3, toes: 4 },
            { knees: 5, toes: 6},
          ],
          organism: userId,
          createdAt: moment().startOf('year').valueOf(),
        });
      });

      it('prunes old organisms', () => {
        const pruneSelf = Meteor.server.method_handlers['organisms.prune'];
        const invocation = { userId };
        pruneSelf.apply(invocation, [organismId]);
        expect(Organisms.find().count()).to.equal(0);
      });

      it('cleans up on disconnect', () => {
        const removeSelf = Meteor.server.method_handlers['organisms.disconnect'];
        const invocation = { userId };
        removeSelf.apply(invocation, [organismId]);
        expect(Organisms.find().count()).to.equal(0);
      });
    });
  });
}
