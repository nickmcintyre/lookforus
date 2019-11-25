import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';

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
        verticalAlign='middle'
        centered
        columns={3}
        stackable={true}
        style={{ height: '100vh', width: '100%' }}
      >
        <Grid.Row>
          <Grid.Column>
            <Card fluid={true}>
              <Image src={'/images/lookforus.png'} wrapped ui={false} />
              <Card.Content style={{ borderTop: 'none' }}>
                <Card.Header>Welcome to the network.</Card.Header>
                <Card.Description>
                  <Segment>
                    <Header as='h3'><Icon name='user secret'/> A note on privacy</Header>
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
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <p style={{ textAlign: 'center', fontSize: '1rem', paddingTop: '2em', paddingBottom: '2em' }}>
                  Copyright &copy; 2019 Nick McIntyre. <a href="https://github.com/nickmcintyre/lookforus/blob/master/LICENSE">
                  MIT License</a>.
                </p>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    const { participating } = this.state;
    if (participating) {
      return <Sketch id={'canvas-container'} />;
    } else {
      return this.renderInvitation();
    }
  }
}

export default App;
