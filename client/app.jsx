import React from 'react';
import Home from './pages/home';
import Form from './pages/form';
import Profile from './pages/profile';
import Navbar from './components/navbar';
import parseRoute from './lib/parse-route';

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
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'profile') {
      // const userId = route.params.get('userId');

      // hard coded userId
      const userId = 1;
      return <Profile userId={userId}/>;
    }
    if (route.path === 'form') {
      return <Form />;
    }
  }

  render() {

    return (
      <>
        {/* <Home />
        <Navbar />
        <Form />
        <Profile /> */}
        <Navbar />
        {this.renderPage()}
      </>
    );
  }
}
