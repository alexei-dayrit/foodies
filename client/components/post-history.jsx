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
    return (
      <>
        {
          this.state.posts.map(post => {
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

function Post(props) {
  const { username, profilePhotoUrl, imageUrl, caption, isBought, createdAt, location } = props.post;
  return (
    <>
      <div className='bg-wrapper flex flex-wrap p-4 rounded-xl border border-gray-200'>

          <div className="flex items-center space-x-3 md:pt-0 pb-2 md:hidden">
          <a href="#profile">
            <img className="object-cover w-10 h-10 rounded-full border border-red-300 cursor-pointer" src={`/images/${profilePhotoUrl}`} alt="Profile picture" />
          </a>
            <div>
              <div className='font-semibold text-sm md:text-lg'>{username}</div>
              <div className='text-gray-400 text-xs md:text-sm'>{location}</div>
            </div>
          </div>
          <div className='w-full md:w-1/2'>
            <img className='w-80 md:w-96 h-80 object-cover border border-gray-300' src={`/images/${imageUrl}`} alt='Placeholder image' />
          </div>

          <div className='w-full md:w-1/2 md:pl-4'>
            <div className="md:flex items-center w-full space-x-3 md:pt-0 pb-2 border-b border-gray-200 hidden">
              <img className="object-cover w-10 h-10 rounded-full border border-red-300 cursor-pointer" src="/images/placeholder-profile-pic.jpeg" alt="Profile picture" />
              <div>
                <div className='font-semibold text-sm md:text-lg'>{username}</div>
                <div className='text-gray-400 text-xs md:text-sm'>{location}</div>
              </div>
            </div>
          <div className='w-full pt-2'>
              <div className='font-semibold text-sm md:text-lg'>
                {username}
                {isBought
                  ? <span className='font-normal text-sky-400'>{' Cooked'}</span>
                  : <span className='font-normal text-sky-400'>{' Bought'}</span>}
                </div>
            </div>
            <div className='w-full font-light'>
              {caption}
            </div>
            <div className='w-full text-gray-400 font-light text-xs md:text-sm'>
              {`${formatDistance(new Date(createdAt), new Date(), { includeSeconds: true })} ago`}
            </div>
          </div>

      </div>
    </>
  );
}
