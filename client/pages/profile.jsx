import React, { useState, useEffect, useContext } from 'react';
import PostHistory from '../components/post-history';
import GridHistory from '../components/grid-history';
import GridIcon from '../components/svg-assets/grid-icon';
import ListIcon from '../components/svg-assets/list-icon';
import AppContext from '../lib/app-context';

const fetchProfile = async (selectedUserId, token, setProfileInfo) => {
  const headers = { headers: { 'X-Access-Token': token } };

  const [fetchData1, fetchData2] = await Promise.all([
    fetch(`/api/posts/${selectedUserId}`, headers),
    fetch(`/api/user/${selectedUserId}`, headers)
  ]);
  const posts = await fetchData1.json();
  const selectedUser = await fetchData2.json();
  console.log(posts);
  console.log(selectedUser);

  setProfileInfo(prev => ({
    ...prev,
    posts
  }));

  setProfileInfo(prev => ({
    ...prev,
    selectedUser
  }));
  // fetch(`/api/posts/${selectedUserId}`, {
  //   headers: {
  //     'X-Access-Token': token
  //   }
  // })
  //   .then(res => res.json())
  //   .then(posts => {
  //     setProfileInfo(prev => ({
  //       ...prev,
  //       posts
  //     }));
  //   })
  //   .catch(err => console.error(err));

  // fetch(`/api/user/${selectedUserId}`, {
  //   headers: {
  //     'X-Access-Token': token
  //   }
  // })
  //   .then(res => res.json())
  //   .then(user => {
  //     setProfileInfo(prev => ({
  //       ...prev,
  //       selectedUser: user
  //     }));
  //   })
  //   .catch(err => console.error(err));
};

const Profile = props => {
  const [profileInfo, setProfileInfo] = useState({
    posts: [],
    selectedUser: '',
    showListView: false,
    isFollowing: false,
    followerCount: 0
  });
  // const { posts, selectedUser, showListView, isFollowing, followerCount } = profileInfo;
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

  const handleFollowClicks = () => {
    const token = window.localStorage.getItem('foodies-jwt');

    let fetchMethod = '';
    let fetchRoute = '';
    if (!profileInfo.isFollowing) {
      fetchMethod = 'POST';
      fetchRoute = '/api/follow';
      setProfileInfo(prev => ({ ...profileInfo, isFollowing: true, followerCount: Number(profileInfo.followerCount) + 1 }));
    } else {
      fetchMethod = 'DELETE';
      fetchRoute = '/api/unfollow';
      setProfileInfo(prev => ({ ...profileInfo, isFollowing: false, followerCount: Number(profileInfo.followerCount) - 1 }));
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
            src={profileInfo.selectedUser.profilePhotoUrl || 'images/placeholder-profile-image.jpeg'}
            alt="Profile picture" />
        </div>
        <div className="w-[75%] md:w-2/3 order-2 flex flex-wrap items-center
              md:justify-center text-center font-medium">
          <div className='w-1/3 md:w-[22%]'>
            <p className='font-semibold'>{profileInfo.selectedUser.postCount}</p>
            <p>Posts</p>
          </div>
          <div className='w-1/3 md:w-[22%]'>
            <p className='font-semibold'>{profileInfo.followerCount}</p>
            <p>Followers</p>
          </div>
          <div className='w-1/3 md:w-[22%]'>
            <p className='font-semibold'>{profileInfo.selectedUser.followingCount}</p>
            <p>Following</p>
          </div>
          <div className="w-full md:w-3/4 flex ml-4 pl-4 mt-4 md:text-xl justify-around">
            <div className="w-1/3 flex items-center">
              <p className='font-semibold'>{profileInfo.selectedUser.username}</p>
            </div>
            <div className="w-1/3">
              <button className={`font-medium text-gray-600 border rounded-md px-2 py-1
                    ${profileInfo.isFollowing ? 'bg-blue-400' : 'bg-blue-300'}`}
                onClick={handleFollowClicks}>
                {profileInfo.isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex mb-2'>
        <button className={`w-1/2 border-t border-[#dbdbdb] flex justify-center pr-4
              ${!profileInfo.showListView && 'border-t-2 border-gray-600'} pt-2`}
          onClick={handleGridIconClicks}>
          <GridIcon />
        </button>
        <button className={`w-1/2 border-t border-[#dbdbdb] pl-4 flex justify-center
              ${profileInfo.showListView && 'border-t-2 border-gray-600'} pt-2`}
          onClick={handleListIconClicks}>
          <ListIcon />
        </button>
      </div>
      {profileInfo.showListView
        ? <PostHistory posts={profileInfo.posts} />
        : <GridHistory posts={profileInfo.posts} handleListIconClicks={handleListIconClicks} />}
    </div>
  );
};

export default Profile;
