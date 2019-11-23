import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Button,
  Grid,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react';
import { FaUserSecret} from 'react-icons/fa';

import Sketch from './Sketch';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participating: false,
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    Meteor.call('organisms.connect', userId);
  }

  componentWillUnmount() {
    Meteor.call('organisms.disconnect');
  }

  renderInvitation() {
    return (
        <Grid stackable centered columns={3}>
          <Grid.Column>
            <Image src={'/images/lookforus.png'} size="medium" centered></Image>
            <Header as="h2">Welcome to the network.</Header>
            <Segment>
              <Header as="h3"><FaUserSecret /> A note on privacy</Header>
              <p>
                Video is never transferred from your device. The small amount of
                data needed to represent you is completely anonymous and deleted
                every 5 seconds. You are welcome to view the
                app's <a href="https://github.com/nickmcintyre/lookforus" target="_blank">
                source code</a> or <a href="mailto:nick@mcintyre.io?Subject=Look%20for%20us">
                email me</a> with any questions.
              </p>
            </Segment>
            <Button
              onClick={() => this.setState({ participating: true })}
              style={{ width: '100%' }}
              primary
            >
              Participate
            </Button>
            <p style={{ textAlign: 'center', fontSize: '1rem', paddingTop: '2em', paddingBottom: '2em' }}>
              Copyright &copy; 2019 Nick McIntyre. <a href="https://github.com/nickmcintyre/lookforus/blob/master/LICENSE">
              MIT License</a>.
            </p>
          </Grid.Column>
        </Grid>
    );
  }

  render() {
    const { participating } = this.state;

    return (
      <div>
        {participating ?
          <Sketch id={'canvas-container'} />
          : this.renderInvitation()
        }
      </div>
    );
  }
}

export default App;
