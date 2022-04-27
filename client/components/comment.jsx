import React from 'react';
import formatDistance from 'date-fns/formatDistance';

export default class Comment extends React.Component {
  render() {
    const { comment, userId, commentedAt, username, profilePhotoUrl } = this.props.comment;
    return (
      <>
        <div className='flex pt-2 pl-1'>
          <a className='w-[12%]' href={`#profile?userId=${userId}`}>
            <img alt="Profile picture"
            src={profilePhotoUrl
              ? { profilePhotoUrl }
              : 'images/placeholder-profile-image.jpeg'
            }
              className='object-cover w-8 h-8 rounded-full border border-gray-300'
            />
          </a>
          <div className='w-[88%] leading-tight pl-2'>
            <a href={`#profile?userId=${userId}`} className='font-semibold pr-1'>
              {username}
            </a>
            <span>{comment}</span>
          </div>
        </div>
        <p className='text-xs text-gray-400 font-light pb-1 md:text-sm pl-1'>
          {`${formatDistance(new Date(commentedAt), new Date(), { includeSeconds: true })} ago`}
        </p>
      </>
    );
  }
}
