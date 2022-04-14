import React from 'react';
// import Home from './pages/home';
import Form from './pages/form';
import Profile from './components/profile';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorizing: true
    };
  }

  render() {

    return (
      <>
        <Form />
        <Profile />
      </>
    );
  }
}
