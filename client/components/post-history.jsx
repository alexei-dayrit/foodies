import React from 'react';
import CameraIcon from './svg-assets/camera-icon';
import Post from './post';
export default class PostHistory extends React.Component {

  render() {
    const posts = this.props.posts;
    if (posts.length === 0) {
      return (
        <div className='flex flex-wrap p-4 h-96 rounded-sm border
          border-gray-300 bg-white'>
          <div className='w-full flex flex-col justify-center items-center'>
            <CameraIcon />
            <h1 className='text-lg font-semibold pt-2'>No Posts yet</h1>
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
