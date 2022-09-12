import React, { useState, useEffect, useContext, useRef } from 'react';
import Modal from '../components/modal';
import Redirect from '../components/redirect';
import DeleteIcon from '../components/svg-assets/delete-icon';
import PlusIcon from '../components/svg-assets/plus-icon';
import AppContext from '../lib/app-context';

const PostForm = props => {

  const { user } = useContext(AppContext);
  if (!user) return <Redirect to="sign-in" />;

  const [postInfo, setPostInfo] = useState({
    imagePreview: '/images/placeholder-image-square.jpeg',
    caption: '',
    location: '',
    isBought: null,
    imageUploaded: false,
    showModal: false,
    submitDisabled: false
  });
  const { imagePreview, caption, location, isBought, imageUploaded, showModal, submitDisabled } = postInfo;

  const fileInputRef = useRef(null);
  const postId = props.postId;

  useEffect(() => {
    const token = window.localStorage.getItem('foodies-jwt');
    if (props.postId) {
      fetch(`/api/post/${postId}`, {
        headers: { 'X-Access-Token': token }
      })
        .then(res => res.json())
        .then(post => {
          const { imageUrl, caption, location, isBought } = post;
          setPostInfo({
            ...postInfo,
            imagePreview: imageUrl,
            caption: caption,
            location: location,
            isBought: isBought
          });
        })
        .catch(err => console.error(err));
    }
  }, []);

  const handleCaptionChange = event => {
    setPostInfo({ ...postInfo, caption: event.target.value });
  };

  const handleLocationChange = event => {
    setPostInfo({ ...postInfo, location: event.target.value });
  };

  const handleIsBoughtChange = event => {
    if (event.target.value === 'cooked') {
      setPostInfo({ ...postInfo, isBought: false });
    } else {
      setPostInfo({ ...postInfo, isBought: true });
    }
  };

  const handleImageUpload = event => {
    setPostInfo({
      ...postInfo,
      imagePreview: URL.createObjectURL(fileInputRef.current.files[0]),
      imageUploaded: true
    });
  };

  const handleDelete = event => {
    const token = window.localStorage.getItem('foodies-jwt');
    fetch(`/api/deletePost/${postId}`, {
      method: 'DELETE',
      headers: { 'X-Access-Token': token }
    })
      .then(() => {
        window.location.hash = `#profile?userId=${user.userId}`;
      })
      .catch(err => console.error(err));
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (caption && location && fileInputRef.current.files[0] &&
      (isBought === true || isBought === false)) {
      setPostInfo({ ...postInfo, submitDisabled: true });
    }

    const formData = new FormData();
    formData.append('image', fileInputRef.current.files[0]);
    formData.append('caption', caption);
    formData.append('location', location);
    formData.append('isBought', isBought);

    let fetchMethod = '';
    let fetchRoute = '';
    let hashRoute = '';
    const token = window.localStorage.getItem('foodies-jwt');
    if (!postId) {
      fetchRoute = '/api/uploads';
      fetchMethod = 'POST';
      hashRoute = '#';
    } else {
      fetchMethod = 'PUT';
      fetchRoute = `/api/edit/${postId}`;
      hashRoute = '#profile';
    }

    fetch(fetchRoute, {
      method: fetchMethod,
      body: formData,
      headers: { 'X-Access-Token': token }
    })
      .then(response => response.json())
      .then(result => {
        setPostInfo({
          ...postInfo,
          caption: '',
          location: '',
          isBought: null,
          imagePreview: '/images/placeholder-image-square.jpeg'
        });
        fileInputRef.current.value = null;
        window.location.hash = hashRoute;
      })
      .catch(err => console.error(err));
  };

  const handleModal = event => {
    setPostInfo({ ...postInfo, showModal: !showModal });
  };

  return (
    <div className='sm:w-96 md:w-[768px] lg:w-[900px] p-4 mx-auto mb-2 mt-8'>
      <h1 className='text-2xl flex justify-center mt-6 pb-4'>
        {postId ? 'Edit Post' : 'New Post'}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-wrap p-4 rounded-sm border shadow-md bg-white border-gray-300'>
          <div className='w-full md:w-[60%] relative order-1'>
            <img className='w-full object-cover object-left
                  border-gray-300' src={imagePreview} alt='Placeholder image'
            />
            {!imageUploaded &&
              <a href="">
                <label htmlFor='image' className='inset-center cursor-pointer'>
                  <PlusIcon />
                </label>
              </a>}
            <input ref={fileInputRef} className='inset-center opacity-0 cursor-pointer'
              type="file" id="image" name="image" accept=".png, .jpg, .jpeg, .gif"
              required={imagePreview === '/images/placeholder-image-square.jpeg'}
              onChange={handleImageUpload}
            />
          </div>
          <div className='w-full md:w-[40%] order-2 px-2 md:px-4'>
            <div className="flex items-center space-x-3 py-4 md:pt-0 border-b border-slate-200">
              <a href={`#profile?userId=${user.userId}`}>
                <img className="object-cover object-center w-10 h-10 rounded-full border
                      border-gray-300 cursor-pointer" alt="Profile picture"
                  src={user.profilePhotoUrl ? user.profilePhotoUrl : '/images/placeholder-profile-image.jpeg'}
                />
              </a>
              <div className="space-y-1 font-semibold">
                <a href={`#profile?userId=${user.userId}`} className='cursor-pointer'>
                  {user.username}
                </a>
              </div>
            </div>
            <div className="border-b border-gray-200">
              <textarea required type="text" name="caption" placeholder="Write a caption"
                value={caption} onChange={handleCaptionChange}
                className='bg-[#f8f9fa] bg-opacity-60 py-2 pl-1 my-2' cols={40} rows={3}
              />
            </div>
            <div className="border-b border-gray-200">
              <input type="text" name="location" placeholder='Add location' required
                value={location} onChange={handleLocationChange}
                className='bg-[#f8f9fa] bg-opacity-60 w-full py-2 pl-1 my-2' />
            </div>
            <div className="py-4">
              <ul id="isBought" className="inline-flex items-center
                    h-10 space-x-1 rounded-md font-semibold text-sky-600">
                <li className="switch-item flex h-8 bg-gray-300x">
                  <input onChange={handleIsBoughtChange} checked={isBought === false}
                    type="radio" name="isBought" id="cooked" value='cooked' className="sr-only" required
                  />
                  <label htmlFor="cooked" className="hover:scale-110 border-2 h-9 py-2 px-2 cursor-pointer
                        text-sm leading-4 text-gray-600 hover:text-gray-800 bg-white rounded shadow"
                  >Home-cooked
                  </label>
                </li>
                <li className="switch-item flex relative h-8 bg-gray-300x">
                  <input onChange={handleIsBoughtChange} checked={isBought === true}
                    type="radio" name="isBought" id="bought" value='bought' className="sr-only" required
                  />
                  <label htmlFor="bought" className="hover:scale-110 border-2 h-9 py-2 px-2 ml-1 cursor-pointer
                        text-sm leading-4 text-gray-600 hover:text-gray-800 bg-white rounded shadow"
                  >Bought
                  </label>
                </li>
              </ul>
            </div>
            <div className="pb-2 pt-8 flex">
              {postId && <div className='w-1/2'>
                <a onClick={handleModal} className='cursor-pointer'>
                  <DeleteIcon />
                </a>
              </div>}
              <div className={`flex mt-1 ${postId ? 'w-1/2 justify-end' : 'w-full flex-row-reverse pr-1'}`}>
                <button type="submit" name='share' className='hover:scale-110 text-blue-600 text-xl'
                  disabled={submitDisabled}>
                  {postId ? 'Save' : 'Share'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {
        showModal && (
          <Modal handleModal={handleModal} handleDelete={handleDelete} />
        )
      }
    </div >
  );
};

export default PostForm;
