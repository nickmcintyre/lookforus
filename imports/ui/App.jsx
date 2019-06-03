import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import Sketch from './Sketch';


class App extends Component {
  componentDidMount() {
    const { userId } = this.props;
    Meteor.call('organisms.connect', userId);
    Meteor.call('organisms.prune');
  }

  componentWillUnmount() {
    const { userId } = this.props;
    Meteor.call('organisms.disconnect', userId);
  }

  render() {
    return <Sketch id={'canvas-container'} />;
  }
}

export default App;
