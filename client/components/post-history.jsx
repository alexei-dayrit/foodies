import React from 'react';

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
              <div key={post.postId} className=''>
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
  const { username, imageUrl, caption, isBought, location } = props.post;
  return (
    <>
      <div className='bg-wrapper flex flex-wrap p-2 rounded-xl border border-gray-100'>
        <div className='w-full md:w-1/2 md:pl-4'>
          {/* Profile pic */}
          <div className="flex items-center space-x-3 md:pt-0 pb-2 border-b border-gray-200">
            <img className="object-cover w-10 h-10 rounded-full border border-red-300 cursor-pointer" src="/images/placeholder-profile-pic.jpeg" alt="Profile picture" />
            <div>
              <div className='font-semibold text-sm md:text-lg'>{username}</div>
              <div className='text-gray-400 text-xs md:text-sm'>{location}</div>
            </div>
          </div>
          {/* Photo */}
          <div className='w-full'>
            <img className='w-80 md:w-96 h-80 object-cover border border-gray-300' src={`/images/${imageUrl}`} alt='Placeholder image' />
          </div>
          <div className='w-full pt-2'>
            <div className='font-semibold text-sm md:text-lg'>
              {username}
              {isBought
                ? <span className='font-normal text-gray-400'>{' Cooked'}</span>
                : <span className='font-normal text-gray-400'>{' Bought'}</span>}
              </div>
          </div>
          <div className='w-full font-light'>
            {caption}
          </div>
        </div>
      </div>
    </>
  );
}
