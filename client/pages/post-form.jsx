import React from 'react';
import Modal from '../components/modal';
import DeleteIcon from '../components/svg-assets/delete-icon';
import PlusIcon from '../components/svg-assets/plus-icon';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreview: '/images/placeholder-image-square.jpeg',
      caption: '',
      location: '',
      isBought: null,
      isUploaded: false,
      showModal: false,
      isDisabled: false
    };
    this.fileInputRef = React.createRef();
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleIsBoughtChange = this.handleIsBoughtChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('foodies-jwt');
    if (this.props.postId) {
      fetch(`/api/post/${this.props.postId}`, {
        headers: { 'X-Access-Token': token }
      })
        .then(res => res.json())
        .then(post => {
          const { imageUrl, caption, location, isBought } = post;
          this.setState({
            imagePreview: imageUrl,
            caption: caption,
            location: location,
            isBought: isBought
          });
        })
        .catch(err => console.error(err));
    }
  }

  handleCaptionChange(event) {
    this.setState({ caption: event.target.value });
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleIsBoughtChange(event) {
    if (event.target.value === 'cooked') {
      this.setState({ isBought: false });
    } else {
      this.setState({ isBought: true });
    }
  }

  handleImageUpload(event) {
    this.setState({
      imagePreview: URL.createObjectURL(this.fileInputRef.current.files[0]),
      isUploaded: true
    });
  }

  handleDelete(event) {
    const { user } = this.context;
    const token = window.localStorage.getItem('foodies-jwt');
    fetch(`/api/deletePost/${this.props.postId}`, {
      method: 'DELETE',
      headers: { 'X-Access-Token': token }
    })
      .then(() => {
        window.location.hash = `#profile?userId=${user.userId}`;
      })
      .catch(err => console.error(err));
  }

  handleSubmit(event) {
    event.preventDefault();

    const { caption, location, isBought } = this.state;
    if (caption && location && this.fileInputRef.current.files[0] &&
      (isBought === true || isBought === false)) {
      this.setState({ isDisabled: true });
    }

    const formData = new FormData();
    formData.append('image', this.fileInputRef.current.files[0]);
    formData.append('caption', caption);
    formData.append('location', location);
    formData.append('isBought', isBought);

    let fetchMethod = '';
    let fetchRoute = '';
    let hashRoute = '';
    const token = window.localStorage.getItem('foodies-jwt');
    if (!this.props.postId) {
      fetchRoute = '/api/uploads';
      fetchMethod = 'POST';
      hashRoute = '#';
    } else {
      fetchMethod = 'PUT';
      fetchRoute = `/api/edit/${this.props.postId}`;
      hashRoute = '#profile';
    }

    fetch(fetchRoute, {
      method: fetchMethod,
      body: formData,
      headers: { 'X-Access-Token': token }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          caption: '',
          location: '',
          isBought: null,
          imagePreview: '/images/placeholder-image-square.jpeg'
        });
        this.fileInputRef.current.value = null;
        window.location.hash = hashRoute;
      })
      .catch(err => console.error(err));
  }

  handleModal(event) {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const postId = this.props.postId;
    const {
      handleSubmit, handleImageUpload, handleCaptionChange, handleLocationChange,
      handleDelete, handleIsBoughtChange, handleModal
    } = this;
    const { imagePreview, caption, location, isBought, isDisabled } = this.state;
    const { user } = this.context;

    if (!user) return <Redirect to="sign-in" />;

    return (
      <>
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
                {!this.state.isUploaded &&
                  <a href="">
                    <label htmlFor='image' className='inset-center cursor-pointer'>
                      <PlusIcon />
                    </label>
                  </a>}
                <input ref={this.fileInputRef} className='inset-center opacity-0 cursor-pointer'
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
                      disabled={isDisabled}>
                    {postId ? 'Save' : 'Share'}
                  </button>
                </div>
              </div>
            </div>
        </div>
      </form>
        </div >
    {
      this.state.showModal && (
        <Modal handleModal={handleModal} handleDelete={handleDelete} />
      )
    }
      </>
    );
  }
}
PostForm.contextType = AppContext;
