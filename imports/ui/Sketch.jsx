import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Organisms from '../api/organisms';
import posenet from '../sketch/posenet';


class Sketch extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.canvas = {};
  }

  componentDidMount() {
    const { id } = this.props;
    this.canvas = new window.p5(posenet, id);
    this.canvas.superorganism = null;
  }

  componentWillUnmount() {
    this.canvas.remove();
  }

  render() {
    const { id, superorganism } = this.props;
    this.canvas.superorganism = superorganism;

    return (
      <div
        id={id}
        style={{ width: '100%', textAlign: 'center' }}
      />
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('organisms');

  return {
    superorganism: Organisms.find({}).fetch(),
  };
})(Sketch);
