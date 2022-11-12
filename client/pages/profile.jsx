import React, { useState, useEffect, useContext } from 'react';
import fetchProfile from '../components/fetch-profile';
import PostHistory from '../components/post-history';
import GridHistory from '../components/grid-history';
import GridIcon from '../components/svg-assets/grid-icon';
import ListIcon from '../components/svg-assets/list-icon';
import AppContext from '../lib/app-context';

const Profile = props => {
  const [profileInfo, setProfileInfo] = useState({
    posts: [],
    selectedUser: '',
    showListView: false
  });
  const { posts, selectedUser, showListView } = profileInfo;
  const { user } = useContext(AppContext);
  const propsUserId = props.userId;

  useEffect(() => {
    const token = window.localStorage.getItem('foodies-jwt');
    let selectedUserId = propsUserId;
    if (!selectedUserId) {
      selectedUserId = user.userId;
    }
    fetchProfile(selectedUserId, token, setProfileInfo);
  }, []);

  const handleGridIconClicks = () => {
    setProfileInfo(prev => ({ ...profileInfo, showListView: false }));
  };

  const handleListIconClicks = () => {
    setProfileInfo(prev => ({ ...profileInfo, showListView: true }));
  };

  const handleFollowClicks = event => {
    const token = window.localStorage.getItem('foodies-jwt');
    const followerCount = selectedUser.followerCount;
    const value = event.target.value;

    let fetchMethod = '';
    let fetchRoute = '';

    if (value === 'follow') {
      fetchMethod = 'POST';
      fetchRoute = '/api/follow';
      setProfileInfo(prev => ({
        ...prev,
        selectedUser: { ...selectedUser, isFollowing: true, followerCount: Number(followerCount) + 1 }
      }));
    } else {
      fetchMethod = 'DELETE';
      fetchRoute = '/api/unfollow';
      setProfileInfo(prev => ({
        ...prev,
        selectedUser: { ...selectedUser, isFollowing: false, followerCount: Number(followerCount) - 1 }
      }));
    }

    fetch(fetchRoute, {
      method: fetchMethod,
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify({ userId: propsUserId })
    })
      .then(response => response.json())
      .catch(err => console.error(err));
  };

  return (
    <div className='sm:w-96 md:w-[768px] lg:w-[900px] p-2 mx-auto overflow-hidden mt-8'>
      <div className='flex flex-wrap p-4 pb-6'>
        <div className='w-[25%] md:w-1/3 order-1 flex items-center md:justify-end'>
          <img className="w-20 h-20 md:w-36 md:h-36
              border-gray-300 border rounded-full object-cover"
            src={selectedUser.profilePhotoUrl || 'images/placeholder-profile-image.jpeg'}
            alt="Profile picture" loading='lazy'/>
        </div>
        <div className="w-[75%] md:w-2/3 order-2 flex flex-wrap items-center
              md:justify-center text-center font-medium">
          <div className='w-1/3 md:w-[22%]'>
            <p className='font-semibold'>{selectedUser.postCount}</p>
            <p>Posts</p>
          </div>
          <div className='w-1/3 md:w-[22%]'>
            <p className='font-semibold'>{selectedUser.followerCount}</p>
            <p>Followers</p>
          </div>
          <div className='w-1/3 md:w-[22%]'>
            <p className='font-semibold'>{selectedUser.followingCount}</p>
            <p>Following</p>
          </div>
          <div className="w-full md:w-3/4 flex ml-4 pl-4 mt-4 md:text-xl justify-around">
            <div className="w-1/3 flex items-center">
              <p className='font-semibold'>{selectedUser.username}</p>
            </div>
            <div className="w-1/3">
              <button className={`font-medium text-gray-600 border rounded-md px-2 py-1
                    ${selectedUser.isFollowing ? 'bg-blue-400' : 'bg-blue-300'}`}
                onClick={handleFollowClicks}
                value={selectedUser.isFollowing ? 'unfollow' : 'follow'}>
                {selectedUser.isFollowing ? 'Unfollow' : 'Follow'}
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
  );
};

export default Profile;
