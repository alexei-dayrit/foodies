import React from 'react';
import AppContext from '../lib/app-context';
import AuthForm from '../components/auth-form';
export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { user, route, handleSignIn } = this.context;
    return (
      <>
        <AuthForm
          key={route.path}
          action={route.path}
          onSignIn={handleSignIn}/>
      </>
    );
  }
}

AuthPage.contextType = AppContext;
