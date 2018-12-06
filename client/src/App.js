import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { withFirebase } from '../src/components/Firebase';

// components
import RouterComponent from './components/routerComponent'

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    }
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    const { firebase } = this.props;
    console.log('app.js firebase: ', firebase);
    return (
      <ApolloProvider client={client}>
        <RouterComponent firebase={firebase} />
      </ApolloProvider>
    );
  }
}

export default withFirebase(App);
