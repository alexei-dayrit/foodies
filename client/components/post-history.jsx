import React from 'react';
import CameraIcon from './svg-assets/camera-icon';
import Post from './post';
export default class PostHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch(`/api/posts/${this.props.userId}`)
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts: posts });
      })
      .catch(err => console.error(err));
  }

  render() {
    const posts = this.state.posts;
    if (posts.length === 0) {
      return (
        <div className='bg-wrapper flex flex-wrap p-4 h-96 rounded-xl border
          border-gray-200'>
          <div className='w-full flex flex-col justify-center items-center'>
            <CameraIcon />
            <h1 className='text-xl font-semibold pt-2'>No Posts yet</h1>
          </div>
        </div>
      );
    }
    return (
      <>
        {posts.map(post => {
          return (
            <div key={post.postId} className='my-4'>
              <Post post={post}/>
            </div>
          );
        })}
      </>
    );
  }
}
