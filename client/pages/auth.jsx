import React, { useContext } from 'react';
import AppContext from '../lib/app-context';
import AuthForm from '../components/auth-form';
import Redirect from '../components/redirect';

const AuthPage = () => {
  const { user, route, handleSignIn } = useContext(AppContext);

  if (user) return <Redirect to="" />;

  return (
      <>
        <AuthForm
          key={route.path}
          action={route.path}
          onSignIn={handleSignIn}/>
      </>
  );
};

export default AuthPage;
