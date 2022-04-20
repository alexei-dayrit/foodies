import React from 'react';
import Modal from '../components/modal';
import DeleteIcon from '../components/svg-assets/delete-icon';
import PlusIcon from '../components/svg-assets/plus-icon';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreview: '/images/placeholder-image-square.jpeg',
      caption: '',
      location: '',
      isBought: null,
      isUploaded: false,
      showModal: false
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
    if (this.props.postId) {
      fetch(`/api/post/${this.props.postId}`)
        .then(res => res.json())
        .then(post => {
          const { imageUrl, caption, location, isBought } = post;
          this.setState({
            imagePreview: `images/${imageUrl}`,
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
    if (event.target.value === 'bought') {
      this.setState({ isBought: true });
    } else {
      this.setState({ isBought: false });
    }
  }

  handleImageUpload(event) {
    this.setState({
      imagePreview: URL.createObjectURL(this.fileInputRef.current.files[0]),
      isUploaded: true
    });
  }

  handleDelete(event) {
    fetch(`/api/deletePost/${this.props.postId}`, {
      method: 'DELETE'
    })
      .then(() => {
        window.location.hash = 'profile';
      })
      .catch(err => console.error(err));
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', this.fileInputRef.current.files[0]);
    formData.append('caption', this.state.caption);
    formData.append('location', this.state.location);
    formData.append('isBought', this.state.isBought);

    let fetchMethod = '';
    let fetchRoute = '';
    let hashRoute = '';
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
      body: formData
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
    const imagePreview = this.state.imagePreview;
    const isBought = this.state.isBought;
    const postId = this.props.postId;
    return (
      <>
        <div className='w-96 md:w-[800px] p-4 m-auto'>
          <h1 className='text-2xl flex justify-center pb-4'>
            {postId ? 'Edit Post' : 'New Post'}
          </h1>
          <form onSubmit={this.handleSubmit}>
            <div className='bg-wrapper flex flex-wrap p-2 rounded-xl border border-gray-200'>
              <div className='w-full md:w-1/2 relative order-1'>
                <img className='w-96 h-96 max-h-96 object-cover object-center border
                  border-gray-300' src={imagePreview} alt='Placeholder image'
                />
                {!this.state.isUploaded &&
                  <a href="">
                    <label htmlFor='image' className='inset-center cursor-pointer'>
                      <PlusIcon />
                    </label>
                  </a>}
                <input ref={this.fileInputRef} className='inset-center opacity-0 cursor-pointer'
                  type="file" id="image" name="image"
                  accept=".png, .jpg, .jpeg, .gif" onChange={this.handleImageUpload}
                />
              </div>
              <div className='w-full md:w-1/2 order-2 px-2 md:px-4'>
                <div className="flex items-center space-x-3 py-4 md:pt-0">
                  <img className="object-cover object-center w-10 h-10 rounded-full border
                    border-red-300 cursor-pointer" src="/images/placeholder-profile-pic.jpeg"
                    alt="Profile picture"
                  />
                  <div className="space-y-1 font-semibold">
                    <div className='cursor-pointer'>sushi_lover</div>
                  </div>
                </div>
                <div className="py-4 border-b border-gray-200">
                  <textarea required type="text" name="caption" placeholder="Write a caption"
                    value={this.state.caption} onChange={this.handleCaptionChange}
                    className='bg-wrapper' cols={40} rows={2}
                  />
                </div>
                <div className="py-4 border-b border-gray-200">
                  <input type="text" name="location" placeholder='Add location'
                    value={this.state.location} onChange={this.handleLocationChange}
                    className='bg-wrapper' />
                </div>
                <div className="py-4">
                  <ul id="isBought" className="filter-switch inline-flex items-center
                    h-10 space-x-1 rounded-md font-semibold text-sky-600">
                    <li className="filter-switch-item flex h-8 bg-gray-300x">
                      <input onChange={this.handleIsBoughtChange} checked={isBought === false}
                        type="radio" name="isBought" id="cooked" value='cooked' className="sr-only" required
                      />
                      <label htmlFor="cooked" className="hover:scale-110 border-2 h-9 py-2 px-2
                        text-sm leading-4 text-gray-600 hover:text-gray-800 bg-white rounded shadow"
                        >Home-cooked
                      </label>
                    </li>
                    <li className="filter-switch-item flex relative h-8 bg-gray-300x">
                      <input onChange={this.handleIsBoughtChange} checked={isBought === true}
                        type="radio" name="isBought" id="bought" value='bought' className="sr-only" required
                      />
                      <label htmlFor="bought" className="hover:scale-110 border-2 h-9 py-2 px-2 ml-1
                        text-sm leading-4 text-gray-600 hover:text-gray-800 bg-white rounded shadow"
                        >Bought
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="pb-2 pt-8 flex">
                  {postId && <div className='w-1/2'>
                    <a onClick={this.handleModal} className='cursor-pointer'>
                      <DeleteIcon />
                    </a>
                  </div>}
                  <div className={`flex mt-1 ${postId ? 'w-1/2 justify-end' : 'w-full flex-row-reverse pr-1'}` }>
                    <button type="submit" name='share' className='hover:scale-110 text-blue-600 text-xl'>
                      {postId ? 'Save' : 'Share'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {this.state.showModal && (
          <Modal handleModal={this.handleModal} showModal={this.state.showModal}
            handleDelete={this.handleDelete}/>
        )}
      </>
    );
  }
}
