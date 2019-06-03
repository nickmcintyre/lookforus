import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import moment from 'moment';


export default Organisms = new Mongo.Collection('organisms');

if (Meteor.isServer) {
  Meteor.publish('organisms', function organismsPublication() {
    return Organisms.find({});
  });
}

Meteor.methods({
  'organisms.connect'(userId) {
    check(userId, String);
    this.setUserId(userId);
    const now = moment().valueOf();
    Organisms.insert({
      poses: null,
      createdAt: now,
      organism: this.userId,
    });
  },
  'organisms.insert'(poses) {
    Organisms.remove({ organism: this.userId });
    const now = moment().valueOf();
    Organisms.insert({
      poses,
      createdAt: now,
      organism: this.userId,
    });
  },
  'organisms.disconnect'(userId) {
    check(userId, String);
    Organisms.remove({ organism: this.userId });
  },
  'organisms.prune'() {
    const now = moment().valueOf();
    Organisms.remove({ createdAt: { $lt: now - 5000 } });
  },
});
