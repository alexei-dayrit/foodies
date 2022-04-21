import React from 'react';
import Post from '../components/post';
import Redirect from '../components/redirect';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('api/posts')
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
        <div className='drop-shadow-md w-96 md:w-[800px] p-4 m-auto'>
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
