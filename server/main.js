import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/littledata:synced-cron';

import Organisms from '../imports/api/organisms';


if (Meteor.isServer) {
  Meteor.startup(() => {
    SyncedCron.config({
      collectionTTL: 600,
    });
    SyncedCron.add({
      name: 'Prune database',
      schedule: function (parser) {
        return parser.text('every 5 seconds');
      },
      job: function () {
        Meteor.call('organisms.prune');
      },
    });
    SyncedCron.start();
  });
}
