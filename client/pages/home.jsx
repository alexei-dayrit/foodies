import React from 'react';
import Post from '../components/post';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('foodies-jwt');
    fetch('/api/posts', {
      headers: { 'X-Access-Token': token }
    })
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts: posts });
      })
      .catch(err => console.error(err));
  }

  render() {
    const posts = this.state.posts;

    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <>
        <div className='sm:w-96 md:w-[768px] lg:w-[900px] p-2 m-auto mt-8'>
          {posts.map(post => {
            return (
              <div key={post.postId} className='my-4'>
                <Post post={post} />
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
Home.contextType = AppContext;
