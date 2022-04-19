import React from 'react';
import PenIcon from './svg-assets/pen-icon';
import formatDistance from 'date-fns/formatDistance';
import HeartIcon from './svg-assets/heart-icon';

export default function Post(props) {
  const {
    username, postId, profilePhotoUrl, imageUrl, caption, isBought,
    createdAt, location, editedAt, numberOfLikes
  } = props.post;

  return (
    <>
      <div className='drop-shadow-md bg-wrapper flex flex-wrap p-4 rounded-xl border
        border-gray-200'>
        <div className="flex items-center w-full space-x-3 md:pt-0 pb-2 md:hidden">
          <div className="flex w-full">
            <a href="#profile">
              <img className="object-cover w-10 h-10 rounded-full border border-red-300"
                src={`/images/${profilePhotoUrl}`} alt="Profile picture" />
            </a>
            <div>
              <a href="#profile">
                <div className='font-semibold text-sm md:text-lg pl-3'>{username}</div>
              </a>
              <div className='text-gray-400 text-xs md:text-sm pl-3'>{location}</div>
            </div>
          </div>
          <a href={`#edit-post?postId=${postId}`}>
            <PenIcon />
          </a>
        </div>
        <div className='w-full md:w-1/2'>
          <img className='drop-shadow-lg w-80 md:w-96 h-80 object-cover border border-gray-200'
            src={`/images/${imageUrl}`} alt='Placeholder image' />
        </div>
        <div className='w-full md:w-1/2 md:pl-4'>
          <div className="md:flex items-center w-full space-x-3 md:pt-0 pb-2 border-b
            border-gray-200 hidden">
            <div className="flex w-full">
              <a href="#profile">
                <img className="object-cover w-12 h-12 rounded-full border border-red-300"
                  src="/images/placeholder-profile-pic.jpeg" alt="Profile picture" />
              </a>
              <div>
                <a href="#profile">
                  <div className='font-semibold text-sm md:text-lg md:pl-3'>{username}</div>
                </a>
                <div className='text-gray-400 text-xs md:text-sm md:pl-3'>{location}</div>
              </div>
            </div>
            <a href={`#edit-post?postId=${postId}`}>
              <PenIcon />
            </a>
          </div>
          <div className="w-full pt-2">
            <a className='curor-pointer'>
              <HeartIcon />
            </a>
            <p>{`${numberOfLikes} likes`}</p>
          </div>
          <div className='w-full'>
            <div className='font-semibold text-sm md:text-lg'>
              {username}
              {isBought
                ? <span className='font-normal text-sky-600'>{' Cooked'}</span>
                : <span className='font-normal text-sky-600'>{' Bought'}</span>}
            </div>
          </div>
          <div className='w-full font-light'>
            {caption}
          </div>
          <div className='w-full text-gray-400 font-light text-xs md:text-sm'>
            {editedAt === null
              ? `${formatDistance(new Date(createdAt), new Date(), { includeSeconds: true })} ago`
              : `edited ${formatDistance(new Date(editedAt), new Date(), { includeSeconds: true })} ago`
            }
          </div>
        </div>
      </div>
    </>
  );
}
