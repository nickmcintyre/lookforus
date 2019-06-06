import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Button,
  Grid,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
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
      <Grid
        columns={1}
      >
        <Grid.Row centered>
          <Grid.Column>
            <Image src={'/images/lookforus.png'} size="medium" centered></Image>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column mobile={15} tablet={10} computer={6}>
            <Header as="h1">Welcome.</Header>
            <p style={{ fontSize: '1.5rem' }}>
              This is an invitation to consider how your virtual interactions
              with people shape your perceptions IRL. Who are these figures
              strewn across your screen? Let's get together and figure it out.
            </p>
            <Segment>
              <Header as="h3"><FaUserSecret /> A note on privacy</Header>
              Video is never transferred from your device. The small amount of
              data needed to represent you is completely anonymous and deleted
              every 5 seconds. You are welcome to view the
              app's <a href="https://github.com/nickmcintyre/lookforus" target="_blank">
              source code</a> or <a href="mailto:nick@mcintyre.io?Subject=Look%20for%20us">
              email me</a> with any questions.
            </Segment>
            <Button
              onClick={() => this.setState({ participating: true })}
              style={{ width: '100%' }}
              primary
            >
              Participate
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column textAlign="center" verticalAlign="bottom">
            <p>
              Copyright &copy; 2019 Nick McIntyre. <a href="https://github.com/nickmcintyre/lookforus/blob/master/LICENSE">
                MIT License</a>.
            </p>
          </Grid.Column>
        </Grid.Row>
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
