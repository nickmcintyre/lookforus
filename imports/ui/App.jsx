import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Button,
  Container,
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
      <Container text>
        <Image src={'/images/lookforus.png'} size="medium" centered></Image>
        <Header as="h1">Welcome.</Header>
        <p style={{ fontSize: '1.5rem' }}>
          Did you get the hint?
        </p>
        <p style={{ fontSize: '1.5rem' }}>
          Social cues are hard. Digital indirection can be calamitous. This is an invitation
          to consider how your virtual interactions with people shape your perceptions IRL. Who
          are these figures strewn across your screen? Let's get together and figure it out.
        </p>
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
      </Container>
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
