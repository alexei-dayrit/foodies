import React from 'react';
import CameraIcon from './svg-assets/camera-icon';
import Post from './post';

const PostHistory = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className='flex flex-wrap p-2 h-96 rounded-sm border
          border-slate-200 bg-white'>
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
          <div key={post.postId} className='relative my-4'>
            <Post post={post} />
          </div>
        );
      })}
    </>
  );
};

export default PostHistory;
