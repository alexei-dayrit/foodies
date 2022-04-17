import React from 'react';
import formatDistance from 'date-fns/formatDistance';

export default class PostHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch(`api/posts/${this.props.userId}`)
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts: posts });
      })
      .catch(err => console.error(err));
  }

  render() {
    const posts = this.state.posts;
    const shallowPosts = posts.slice();
    const mostRecentToLeast = shallowPosts.sort((a, b) => {
      return b.postId - a.postId;
    });

    if (posts.length === 0) {
      return (
        <div className='bg-wrapper flex flex-wrap p-4 h-96 rounded-xl border
          border-gray-200'>
          <div className='w-full flex flex-col justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2
                0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h1 className='text-xl font-semibold pt-2'>No Posts yet</h1>
          </div>
        </div>
      );
    }
    return (
      <>
        {
          mostRecentToLeast.map(post => {
            return (
              <div key={post.postId} className='my-4'>
                <Post post={post} />
              </div>
            );
          })
        }
      </>
    );
  }
}

export function Post(props) {
  const {
    username, postId, profilePhotoUrl, imageUrl, caption, isBought,
    createdAt, location, editedAt
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2
                0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2
                  2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828
                  15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </a>
          </div>
          <div className='w-full pt-2'>
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
