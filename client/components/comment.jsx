import React from 'react';
import formatDistance from 'date-fns/formatDistance';

export default class Comment extends React.Component {
  render() {
    const { comment, commentedAt, username, profilePhotoUrl } = this.props.comment;
    return (
      <>
        <div className='flex pt-1'>
          <div className='w-[10%]'>
            <img src={`images/${profilePhotoUrl}`} alt="Profile picture"
              className='object-cover w-8 h-8 rounded-full border border-red-300'
            />
          </div>
          <p className='w-[90%] leading-tight pl-2'>
            <span className='font-semibold pr-1'>{username}</span>
            {comment}
          </p>
        </div>
        <p className='text-xs text-gray-400 font-light pb-1 md:text-sm'>
          {`${formatDistance(new Date(commentedAt), new Date(), { includeSeconds: true })} ago`}
        </p>
      </>
    );
  }
}
