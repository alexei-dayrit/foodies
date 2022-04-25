import React from 'react';
import Home from './pages/home';
import PostForm from './pages/post-form';
import Profile from './pages/profile';
import Navbar from './components/navbar';
import AuthPage from './pages/auth';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({ route: newRoute });
    });
    const token = window.localStorage.getItem('foodies-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    if (token) {
      window.localStorage.setItem('foodies-jwt', token);
    }
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('foodies-jwt');
    this.setState({ user: null });
    window.location.hash = '#sign-in';
  }

  renderPage() {
    const { route } = this.state;
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
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <>
        <AppContext.Provider value={contextValue}>
          {!(route.path === 'sign-up' || route.path === 'sign-in') &&
            <Navbar />
          }
          {this.renderPage()}
        </AppContext.Provider>
      </>
    );
  }
}
