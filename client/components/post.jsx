import React from 'react';
import Comment from './comment';
import PenIcon from './svg-assets/pen-icon';
import formatDistance from 'date-fns/formatDistance';
import HeartIcon from './svg-assets/heart-icon';
import HeartIconFilled from './svg-assets/heart-icon-filled';
import CommentIcon from './svg-assets/comment-icon';
import AppContext from '../lib/app-context';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: this.props.post.isLiked,
      numberOfLikes: this.props.post.numberOfLikes,
      comments: [],
      showComments: false,
      newComment: ''
    };
    this.handleLikeClicks = this.handleLikeClicks.bind(this);
    this.handleCommentsToggle = this.handleCommentsToggle.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`/api/comments/${this.props.post.postId}`)
      .then(res => res.json())
      .then(comments => {
        this.setState({ comments: comments });
      })
      .catch(err => console.error(err));
  }

  handleLikeClicks(event) {
    const isLiked = this.state.isLiked;
    const numberOfLikes = Number(this.state.numberOfLikes);
    const token = window.localStorage.getItem('foodies-jwt');
    if (!isLiked) {
      fetch(`/api/likes/${this.props.post.postId}`, {
        method: 'POST',
        headers: { 'X-Access-Token': token }
      })
        .then(response => response.json())
        .then(result => {
          this.setState({
            isLiked: true,
            numberOfLikes: numberOfLikes + 1
          });
        })
        .catch(err => console.error(err));
    } else {
      fetch(`/api/deleteLikes/${this.props.post.postId}`, {
        method: 'DELETE',
        headers: { 'X-Access-Token': token }
      })
        .then(() => {
          this.setState({
            isLiked: false,
            numberOfLikes: numberOfLikes - 1
          });
        })
        .catch(err => console.error(err));
    }
  }

  handleCommentsToggle(event) {
    this.setState({ showComments: !this.state.showComments });
  }

  handleCommentChange(event) {
    this.setState({ newComment: event.target.value });
  }

  handleCommentSubmit(event) {
    const token = window.localStorage.getItem('foodies-jwt');
    event.preventDefault();
    fetch(`/api/uploadComment/${this.props.post.postId}`, {
      method: 'POST',
      headers: {
        'X-Access-Token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment: this.state.newComment })
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ newComment: '' });
        fetch(`/api/comments/${this.props.post.postId}`)
          .then(res => res.json())
          .then(comments => {
            this.setState({ comments: comments });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  render() {
    const { user } = this.context;
    const showComments = this.state.showComments;
    const comments = this.state.comments;
    const {
      username, userId, postId, imageUrl, caption, isBought,
      createdAt, location, editedAt
    } = this.props.post;
    let { profilePhotoUrl } = this.props.post;
    if (profilePhotoUrl === null) {
      profilePhotoUrl = 'placeholder-profile-image.jpeg';
    }
    return (
      <>
        <div className='flex flex-wrap rounded-sm border border-slate-200 shadow-md bg-white'>
          <div className="flex items-center w-full space-x-3 p-2 md:pt-0 pb-2 md:hidden">
            <div className="flex w-full">
              <a href={`#profile?userId=${userId}`} className='items-center'>
                <img className="object-cover w-10 h-10 rounded-full border border-gray-300
                 hover:border-slate-400"
                  src={`/images/${profilePhotoUrl}`} alt="Profile picture" />
              </a>
              <a href={`#profile?userId=${userId}`}>
                <h2 className='font-semibold text-sm pl-3 hover:text-slate-400'>{username}</h2>
                <span className='text-gray-400 text-xs pl-3'>{location}</span>
              </a>
            </div>
            {user.userId === userId && (
              <a href={`#edit-post?postId=${postId}`}>
                <PenIcon />
              </a>)
            }
          </div>
          <div className='w-full md:w-[60%] flex flex-wrap'
            href={`/images/${imageUrl}`} target="_blank" rel="noreferrer"
          ><img className='w-full min-h-[300px] max-h-[500px] object-cover'
            src={`/images/${imageUrl}`} alt='Placeholder image' />
          </div>
          <div className='w-full md:w-[40%] md:pl-2 flex flex-col p-2'>
            <div className="md:flex items-center w-full space-x-3 md:pt-0 pb-2 border-b
              border-gray-200 hidden">
              <div className="flex w-full items-center">
                <a href={`#profile?userId=${userId}`}>
                  <img className="object-cover w-10 h-10 rounded-full border border-gray-300 hover:border-slate-400"
                    src={`/images/${profilePhotoUrl}`} alt="Profile picture" />
                </a>
                <a href={`#profile?userId=${userId}`}>
                  <h2 className='font-semibold text-sm md:pl-3 hover:text-slate-400'>{username}</h2>
                  <span className='text-gray-400 text-xs md:pl-3'>{location}</span>
                </a>
              </div>
              {user.userId === userId && (
                <a href={`#edit-post?postId=${postId}`}>
                  <PenIcon />
                </a>)
              }
            </div>
            <div className="w-full pt-2 md:pt-1">
              <div className='flex'>
                <a className='curor-pointer' onClick={this.handleLikeClicks}>
                  {this.state.isLiked ? <HeartIconFilled /> : <HeartIcon />}
                </a>
                <a className='curor-pointer pl-2' onClick={this.handleCommentsToggle}>
                  <CommentIcon />
                </a>
              </div>
              <p className='pl-1 text-sm'>{`${this.state.numberOfLikes} likes`}</p>
            </div>
            <div className='w-full pl-1'>
              <div className='flex'>
                <a href={`#profile?userId=${userId}`}>
                  <h2 className='font-semibold text-sm pr-1 hover:text-slate-400'>
                    {username}
                  </h2>
                </a>
                {isBought
                  ? <span className='font-normal text-sm text-sky-600'>{' Cooked'}</span>
                  : <span className='font-normal text-sm text-sky-600'>{' Bought'}</span>}
              </div>
              <p className='w-full text-sm font-light'>
                {caption}
              </p>
              <p className='w-full text-gray-400 font-light text-xs'>
                {editedAt === null
                  ? `posted ${formatDistance(new Date(createdAt), new Date(), { includeSeconds: true })} ago`
                  : `edited ${formatDistance(new Date(editedAt), new Date(), { includeSeconds: true })} ago`
                }
              </p>
              <button onClick={this.handleCommentsToggle} className='text-gray-400 \
              hover:text-slate-400 text-sm'>
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
              <form onSubmit={this.handleCommentSubmit}
                className='mt-auto pl-1'>
                <textarea type="text" placeholder="Add a comment" required
                  className='border border-slate-600 rounded-xl mt-5 pt-1 px-2
                    w-full h-20'
                  onChange={this.handleCommentChange} value={this.state.newComment}
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
  }
}

Post.contextType = AppContext;
