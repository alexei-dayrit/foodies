import React from 'react';
import Home from './pages/home';
import PostForm from './pages/post-form';
import Profile from './pages/profile';
import Navbar from './components/navbar';
import AuthPage from './pages/auth';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({ route: newRoute });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'sign-up') {
      return <AuthPage />;
    }
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'profile') {
      const userId = 100;
      return <Profile userId={userId} />;
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
    const { route } = this.state;
    const contextValue = { route };
    return (
      <>
        <AppContext.Provider value={contextValue}>
          <Navbar />
          {this.renderPage()}
        </AppContext.Provider>
      </>
    );
  }
}
