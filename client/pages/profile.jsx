import React from 'react';
import PostHistory from '../components/post-history';
import GridHistory from '../components/grid-history';
import GridIcon from '../components/svg-assets/grid-icon';
import ListIcon from '../components/svg-assets/list-icon';
import AppContext from '../lib/app-context';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user: '',
      showListView: false,
      isFollowing: false
    };
    this.handleGridIconClicks = this.handleGridIconClicks.bind(this);
    this.handleListIconClicks = this.handleListIconClicks.bind(this);
    this.handleFollowClicks = this.handleFollowClicks.bind(this);
  }

  componentDidMount() {
    const { user } = this.context;
    let userId = this.props.userId;
    if (!this.props.userId) {
      userId = user.userId;
    }
    fetch(`/api/posts/${userId}`)
      .then(res => res.json())
      .then(posts => {
        this.setState({
          posts: posts
        });
      })
      .catch(err => console.error(err));
    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(user => {
        this.setState({
          user
        });
      })
      .catch(err => console.error(err));
  }

  handleGridIconClicks() {
    this.setState({ showListView: false });
  }

  handleListIconClicks() {
    this.setState({ showListView: true });
  }

  handleFollowClicks() {
    const { userId } = this.props;
    const token = window.localStorage.getItem('foodies-jwt');
    this.setState({ isFollowing: !this.state.isFollowing });

    let fetchMethod = '';
    let fetchRoute = '';
    if (!this.state.isFollowing) {
      fetchMethod = 'POST';
      fetchRoute = '/api/follow';
    } else {
      fetchMethod = 'DELETE';
      fetchRoute = '/api/unfollow';
    }

    fetch(fetchRoute, {
      method: fetchMethod,
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify({ userId: userId })
    })
      .then(response => response.json())
      .catch(err => console.error(err));
  }

  render() {
    const { posts, user, showListView, isFollowing } = this.state;
    const { handleGridIconClicks, handleListIconClicks, handleFollowClicks } = this;
    return (
      <>
        <div className='sm:w-96 md:w-[800px] p-2 mx-auto overflow-hidden mt-16'>
          <div className='flex flex-wrap p-4 pb-6'>
            <div className='w-[25%] md:w-1/3 order-1 flex items-center md:justify-end'>
              <img className="w-20 h-20 md:w-36 md:h-36
                border-gray-300 border rounded-full object-cover"
                src=
                {user.profilePhotoUrl
                  ? user.profilePhotoUrl
                  : 'images/placeholder-profile-image.jpeg'
                }
                alt="Profile picture" />
            </div>
            <div className="w-[75%] md:w-2/3 order-2 flex flex-wrap items-center
              md:justify-center text-center font-medium">
              <div className='w-1/3 md:w-[22%]'>
                <p className='font-semibold'>{user.postCount}</p>
                <p>Posts</p>
              </div>
              <div className='w-1/3 md:w-[22%]'>
                <p className='font-semibold'>{user.followerCount}</p>
                <p>Followers</p>
              </div>
              <div className='w-1/3 md:w-[22%]'>
                <p className='font-semibold'>{user.followingCount}</p>
                <p>Following</p>
              </div>
              <div className="w-full md:w-3/4 flex ml-4 pl-4 mt-4 md:text-xl justify-around">
                <div className="w-1/3 flex items-center">
                  <p className='font-semibold'>{user.username}</p>
                </div>
                <div className="w-1/3">
                  <button className={`font-medium text-gray-600 border rounded-md px-2 py-1
                    ${isFollowing ? 'bg-blue-400' : 'bg-blue-300'}`}
                    onClick={handleFollowClicks}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex mb-2'>
            <button className={`w-1/2 border-t border-[#dbdbdb] flex justify-center pr-4
              ${!showListView && 'border-t-2 border-gray-600'} pt-2`}
              onClick={handleGridIconClicks}>
              <GridIcon />
            </button>
            <button className={`w-1/2 border-t border-[#dbdbdb] pl-4 flex justify-center
              ${showListView && 'border-t-2 border-gray-600'} pt-2`}
              onClick={handleListIconClicks}>
              <ListIcon />
            </button>
          </div>
          {showListView
            ? <PostHistory posts={posts} />
            : <GridHistory posts={posts} handleListIconClicks={handleListIconClicks} />}
        </div>
      </>
    );
  }
}

Profile.contextType = AppContext;
