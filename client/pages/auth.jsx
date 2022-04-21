import React from 'react';
import AppContext from '../lib/app-context';
import AuthForm from '../components/auth-form';
import Redirect from '../components/redirect';
export default class AuthPage extends React.Component {
  render() {
    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

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
