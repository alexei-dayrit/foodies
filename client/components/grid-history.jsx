import React, { useContext } from 'react';
import PenIcon from './svg-assets/pen-icon';
import CameraIcon from './svg-assets/camera-icon';
import Redirect from './redirect';
import AppContext from '../lib/app-context';

const GridHistory = props => {
  const { posts, handleClicks } = props;
  const user = useContext(AppContext);

  if (!user) return <Redirect to="sign-in" />;

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
    <div className='flex flex-wrap mt-3'>
      {posts.map(post => {
        return (
          <div key={post.postId} className='relative my-[1px] px-[1px] md:my-1 md:px-1 w-1/3'>
            <img onClick={handleClicks} className='w-full h-32 md:h-56 object-cover object-center
                border border-slate-200 cursor-pointer' href={post.imageUrl}
              src={post.imageUrl} alt="Thumbnail for post" />
            {user.userId === post.userId &&
              <div className='absolute z-50 top-0 right-1'>
                <a href={`#edit-post?postId=${post.postId}`}>
                  <PenIcon />
                </a>
              </div>
            }
          </div>
        );
      })}
    </div>
  );
};

export default GridHistory;
