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
      showFullPosts: false
    };
    this.handleClicks = this.handleClicks.bind(this);
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

  handleClicks() {
    this.setState({ showFullPosts: !this.state.showFullPosts });
  }

  render() {
    const { posts, user, showFullPosts } = this.state;
    const { handleClicks } = this;
    return (
      <>
        <div className='sm:w-96 md:w-[800px] p-2 mx-auto overflow-hidden mt-16'>
          <div className='flex flex-wrap p-4 pb-6 mb-6 border-b border-[#dbdbdb]'>
            <div className='w-[25%] md:w-1/3 order-1 flex items-center md:justify-end'>
              <img className="w-20 h-20 md:w-36 md:h-36
                border-gray-300 border rounded-full object-cover"
                src=
                {user.profilePhotoUrl
                  ? `images/${user.profilePhotoUrl}`
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
              <div className="w-full md:w-3/4 flex ml-4 pl-4 mt-4 md:text-xl">
                <div className="w-1/3">
                  <p className='font-semibold'>{user.username}</p>
                </div>
              </div>
            </div>
          </div>
          <div onClick={handleClicks} className='flex'>
            <button className='w-1/2 flex justify-center'>
              <GridIcon />
            </button>
            <button className='w-1/2 flex justify-center'>
              <ListIcon />
            </button>
          </div>
          {showFullPosts
            ? <PostHistory posts={posts} />
            : <GridHistory posts={posts} handleClicks={handleClicks} />}
        </div>
      </>
    );
  }
}

Profile.contextType = AppContext;
