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
    const { route } = this.context;
    const welcomeMessage = route.path === 'sign-up'
      ? 'Create an account to get started!'
      : 'Please sign in to continue';

    return (
      <>
        <AuthForm />
      </>
    );
  }
}
AuthPage.contextType = AppContext;
