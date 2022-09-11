import React, { useState, useEffect, useContext } from 'react';
import Comment from './comment';
import Redirect from './redirect';
import AppContext from '../lib/app-context';
import PenIcon from './svg-assets/pen-icon';
import HeartIcon from './svg-assets/heart-icon';
import HeartIconFilled from './svg-assets/heart-icon-filled';
import CommentIcon from './svg-assets/comment-icon';
import formatDistance from 'date-fns/formatDistance';

const Post = props => {
  const { user } = useContext(AppContext);

  if (!user) return <Redirect to="sign-in" />;

  const {
    isLiked, numberOfLikes, username, userId, postId, imageUrl, caption,
    isBought, createdAt, location, editedAt, profilePhotoUrl
  } = props.post;

  const [likesInfo, setLikesInfo] = useState({ isLiked, numberOfLikes });
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const placeholderProfileImage = 'images/placeholder-profile-image.jpeg';

  useEffect(() => {
    const token = window.localStorage.getItem('foodies-jwt');
    fetch(`/api/comments/${postId}`, {
      headers: { 'X-Access-Token': token }
    })
      .then(res => res.json())
      .then(data => {
        setComments(data);
      })
      .catch(err => console.error(err));
  });

  const handleLikeClicks = event => {
    const isLiked = likesInfo.isLiked;
    const numberOfLikes = Number(likesInfo.numberOfLikes);
    const token = window.localStorage.getItem('foodies-jwt');
    if (!isLiked) {
      fetch(`/api/likes/${postId}`, {
        method: 'POST',
        headers: { 'X-Access-Token': token }
      })
        .then(response => response.json())
        .then(result => {
          setLikesInfo({
            isLiked: true,
            numberOfLikes: numberOfLikes + 1
          });
        })
        .catch(err => console.error(err));
    } else {
      fetch(`/api/deleteLikes/${postId}`, {
        method: 'DELETE',
        headers: { 'X-Access-Token': token }
      })
        .then(() => {
          setLikesInfo({
            isLiked: false,
            numberOfLikes: numberOfLikes - 1
          });
        })
        .catch(err => console.error(err));
    }
  };

  const handleCommentsToggle = event => {
    setShowComments(!showComments);
  };

  const handleCommentChange = event => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = event => {
    const token = window.localStorage.getItem('foodies-jwt');
    event.preventDefault();
    fetch(`/api/uploadComment/${postId}`, {
      method: 'POST',
      headers: {
        'X-Access-Token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment: newComment })
    })
      .then(response => response.json())
      .then(result => {
        setNewComment('');
        fetch(`/api/comments/${postId}`)
          .then(res => res.json())
          .then(data => {
            setComments(data);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <div className='flex flex-wrap rounded-sm border border-slate-200 shadow-md bg-white'>
        <div className="flex items-center w-full space-x-3 p-2 md:pt-0 pb-2 md:hidden">
          <div className="flex w-full">
            <a href={`#profile?userId=${userId}`} className='items-center'>
              <img className="object-cover w-10 h-10 rounded-full border border-gray-300
                hover:border-slate-400"
                src={profilePhotoUrl || placeholderProfileImage} alt="Profile picture" />
            </a>
            <div className='flex-col flex'>
              <a href={`#profile?userId=${userId}`}>
                <h2 className='font-semibold text-sm pl-3 hover:text-slate-400'>{username}</h2>
              </a>
              <span className='text-gray-400 text-xs pl-3'>{location}</span>
            </div>
          </div>
          {user.userId === userId && (
            <a href={`#edit-post?postId=${postId}`}>
              <PenIcon />
            </a>)
          }
        </div>
        <div className='w-full md:w-[60%] flex flex-wrap'
          href={imageUrl} target="_blank" rel="noreferrer"
        ><img className='w-full min-h-[300px] max-h-[500px] object-cover'
          src={imageUrl} alt='Photo of post' />
        </div>
        <div className='w-full md:w-[40%] md:pl-2 flex flex-col p-2'>
          <div className="md:flex items-center w-full space-x-3 md:pt-0 pb-2 border-b
              border-gray-200 hidden">
            <div className="flex w-full items-center">
              <a href={`#profile?userId=${userId}`}>
                <img className="object-cover w-10 h-10 rounded-full border border-gray-300 hover:border-slate-400"
                  src={profilePhotoUrl || placeholderProfileImage} alt="Profile picture" />
              </a>
              <div className='flex flex-col'>
                <a href={`#profile?userId=${userId}`}>
                  <h2 className='font-semibold text-sm md:pl-3 hover:text-slate-400'>{username}</h2>
                </a>
                <span className='text-gray-400 text-xs md:pl-3'>{location}</span>
              </div>
            </div>
            {user.userId === userId && (
              <a href={`#edit-post?postId=${postId}`}>
                <PenIcon />
              </a>)
            }
          </div>
          <div className="w-full pt-2 pb-1 md:pt-1">
            <div className='flex'>
              <a className='curor-pointer' onClick={handleLikeClicks}>
                {likesInfo.isLiked ? <HeartIconFilled /> : <HeartIcon />}
              </a>
              <a className='curor-pointer pl-2' onClick={handleCommentsToggle}>
                <CommentIcon />
              </a>
            </div>
            {numberOfLikes > 0 && (
              <p className='pl-1 text-sm'>
                {`${likesInfo.numberOfLikes} ${likesInfo.numberOfLikes > 1 ? 'likes' : 'like'}`}
              </p>
            )}
          </div>
          <div className='w-full pl-1 leading-tight'>
            <div className='flex'>
              <a href={`#profile?userId=${userId}`}>
                <h2 className='font-semibold text-sm pr-1 hover:text-slate-400'>
                  {username}
                </h2>
              </a>
              {isBought
                ? <span className='font-normal text-sm text-sky-600'>{' Bought'}</span>
                : <span className='font-normal text-sm text-sky-600'>{' Cooked'}</span>
              }
            </div>
            <p className='w-full text-sm font-light'>
              {caption}
            </p>
            <p className='w-full text-gray-400 pt-1 font-light text-xs'>
              {editedAt === null
                ? `posted ${formatDistance(new Date(createdAt), new Date(), { includeSeconds: true })} ago`
                : `edited ${formatDistance(new Date(editedAt), new Date(), { includeSeconds: true })} ago`
              }
            </p>
            <button onClick={handleCommentsToggle} className='text-gray-400
              hover:text-slate-500 text-sm'>
              {showComments ? 'Hide comments' : 'View comments'}
            </button>
          </div>
          <div className='md:max-h-[100px] md:overflow-y-scroll'>
            {showComments && comments.map(comment => {
              return (
                <div key={comment.commentId}>
                  <Comment comment={comment} />
                </div>
              );
            })}
          </div>
          {showComments &&
            <form onSubmit={handleCommentSubmit}
              className='mt-auto pl-1'>
              <textarea type="text" placeholder="Add a comment" required
                className='border border-slate-600 rounded-xl mt-5 pt-1 px-2
                    w-full h-20'
                onChange={handleCommentChange} value={newComment}
              />
              <div className='flex w-full justify-end hover:text-blue-700 text-blue-600 text-sm'>
                <button type='submit'>Post</button>
              </div>
            </form>
          }
        </div>
      </div>
    </>
  );
};

export default Post;
