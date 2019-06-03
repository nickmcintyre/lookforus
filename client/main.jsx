import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { render } from 'react-dom';

import App from '../imports/ui/App'


Meteor.startup(() => {
  const userId = Random.id();
  render(<App userId={userId}/>, document.getElementById('react-target'));
});
