import React, { useState, useEffect } from 'react';
import Home from './pages/home';
import PostForm from './pages/post-form';
import Profile from './pages/profile';
import Navbar from './components/navbar';
import AuthPage from './pages/auth';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import AppContext from './lib/app-context';

const App = () => {

  const [user, setUser] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [route, setRoute] = useState(parseRoute(window.location.hash));

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      setRoute(newRoute);
    });
    const token = window.localStorage.getItem('foodies-jwt');
    const user = token ? decodeToken(token) : null;
    setUser(user);
    setIsAuthorizing(false);
  }, []);

  const handleSignIn = result => {
    const { user, token } = result;
    if (token) {
      window.localStorage.setItem('foodies-jwt', token);
    }
    setUser(user);
  };

  const handleSignOut = () => {
    window.localStorage.removeItem('foodies-jwt');
    setUser(null);
    window.location.hash = '#sign-in';
  };

  const renderPage = () => {
    if (route.path === 'sign-up' || route.path === 'sign-in') {
      return <AuthPage />;
    }
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'profile') {
      const userId = route.params.get('userId');
      return <Profile key={userId} userId={userId} />;
    }
    if (route.path === 'edit-post') {
      const postId = route.params.get('postId');
      return <PostForm key='edit-post' postId={postId} />;
    }
    if (route.path === 'new-post') {
      return <PostForm key='new-post' />;
    }
  };

  const contextValue = { user, route, handleSignIn, handleSignOut };
  if (isAuthorizing) return null;

  return (
    <>
      <AppContext.Provider value={contextValue}>
        {!(route.path === 'sign-up' || route.path === 'sign-in' || route.path === '') &&
          <Navbar />
        }
        {renderPage()}
      </AppContext.Provider>
    </>
  );

};

export default App;
