import React from 'react';
import PenIcon from './svg-assets/pen-icon';

export default class GridHistory extends React.Component {
  render() {
    const { posts, handleClicks } = this.props;
    return (
      <div className='flex flex-wrap'>
        {posts.map(post => {
          return (
            <div key={post.postId} className='relative my-[1px] px-[1px] w-1/3'>
              <img onClick={handleClicks} className='w-full h-32 md:h-56 object-cover object-center
                border border-slate-200'
                src={`images/${post.imageUrl}`} alt="Thumbnail for post" />
              <div className='absolute z-50 top-1 right-1'>
                <a href={`#edit-post?postId=${post.postId}`}>
                  <PenIcon />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
