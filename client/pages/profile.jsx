import React from 'react';
import PostHistory from '../components/post-history';
import AppContext from '../lib/app-context';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user: ''
    };
  }

  componentDidMount() {
    fetch(`/api/posts/${this.props.userId}`)
      .then(res => res.json())
      .then(posts => {
        this.setState({
          posts: posts
        });
      })
      .catch(err => console.error(err));
    fetch(`/api/user/${this.props.userId}`)
      .then(res => res.json())
      .then(user => {
        this.setState({
          user
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { posts, user } = this.state;
    return (
      <>
        <div className='sm:w-96 md:w-[800px] p-4 mx-auto overflow-hidden mt-16'>
          <div className='flex flex-wrap p-4 pb-8 mb-8 border-b border-[#dbdbdb]'>
            <div className='w-[25%] md:w-1/3 order-1 flex items-center md:justify-end'>
              <img className="w-[75px] h-[75px] md:w-[120px] md:h-[120px]
                border-gray-300 border rounded-full object-cover"
                src=
                {user.profilePhotoUrl
                  ? `images/${user.profilePhotoUrl}`
                  : 'images/placeholder-profile-image.jpeg'
                }
                alt="Profile picture" />
            </div>
            <div className="w-[75%] md:w-2/3 order-2 flex flex-wrap items-center
              md:justify-center text-center">
              <div className='w-1/3 md:w-[22%]'>
                <p>{user.postCount}</p>
                <p>Posts</p>
              </div>
              <div className='w-1/3 md:w-[22%]'>
                <p>{user.followerCount}</p>
                <p>Followers</p>
              </div>
              <div className='w-1/3 md:w-[22%]'>
                <p>{user.followingCount}</p>
                <p>Following</p>
              </div>
              <div className="w-full md:w-3/4 flex ml-4 pl-4 mt-4 md:text-lg">
                <div className="w-1/3">
                  <p className='font-semibold'>{user.username}</p>
                </div>
              </div>
            </div>
          </div>
          <PostHistory posts={posts}/>
        </div>
      </>
    );
  }
}

Profile.contextType = AppContext;
