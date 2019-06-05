import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'chai';
import moment from 'moment';

import Organisms from '/imports/api/organisms';

if (Meteor.isServer) {
  describe('Server', function () {
    describe('startup', function () {
      const firstUser = Random.id();
      const secondUser = Random.id();
      let firstOrganism;
      let secondOrganism;

      beforeEach(function (done) {
        Organisms.remove({});
        firstOrganism = Organisms.insert({
          poses: [
            { head: 1, shoulders: 2 },
            { knees: 3, toes: 4 },
            { knees: 5, toes: 6},
          ],
          organism: firstUser,
          createdAt: moment().startOf('year').valueOf(),
        });
        secondOrganism = Organisms.insert({
          poses: [
            { head: 7, shoulders: 8 },
            { knees: 9, toes: 10 },
            { knees: 11, toes: 12},
          ],
          organism: secondUser,
          createdAt: moment().endOf('year').valueOf(),
        });
        this.timeout(10000);
        setTimeout(done, 8000);
      });

      // FIXME: figure out timeoouts... works on the server
      it('prunes old organisms', function () {
        expect(Organisms.find({}).count()).to.equal(1);
      });
    });
  });
}
