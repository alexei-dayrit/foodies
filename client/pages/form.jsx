import React from 'react';
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreview: '/images/placeholder-image-square.jpeg',
      caption: '',
      location: '',
      isBought: null,
      isUploaded: false
    };
    this.fileInputRef = React.createRef();
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleIsBoughtChange = this.handleIsBoughtChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.postId) {
      fetch(`/api/post/${this.props.postId}`)
        .then(res => res.json())
        .then(post => {
          const { imageUrl, caption, location, isBought } = post[0];
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

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', this.fileInputRef.current.files[0]);
    formData.append('caption', this.state.caption);
    formData.append('location', this.state.location);
    formData.append('isBought', this.state.isBought);

    let fetchMethod = '';
    let fetchRoute = '';
    if (!this.props.postId) {
      fetchRoute = '/api/uploads';
      fetchMethod = 'POST';
      window.location.hash = '#';
    } else {
      fetchMethod = 'PUT';
      fetchRoute = `/api/edit/${this.props.postId}`;
      window.location.hash = 'profile';
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
      })
      .catch(err => console.error(err));
  }

  render() {
    const imagePreview = this.state.imagePreview;
    const isBought = this.state.isBought;
    return (
      <>
        <div className='w-96 md:w-[800px] p-4 m-auto'>
          <h1 className='text-2xl flex justify-center pb-4'>
            {this.props.postId ? 'Edit Post' : 'New Post'}
            </h1>
          <form onSubmit={this.handleSubmit}>
            <div className='bg-wrapper flex flex-wrap p-2 rounded-xl border border-gray-200'>
              <div className='w-full md:w-1/2 relative order-1'>
                <img className='w-96 h-96 max-h-96 object-cover object-center border border-gray-300' src={imagePreview} alt='Placeholder image' />
                {!this.state.isUploaded &&
                <a href="">
                  <label htmlFor='image' className='inset-center cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </label>
                </a>}
                <input ref={this.fileInputRef} className='inset-center opacity-0 cursor-pointer' type="file" id="image" name="image"
                  accept=".png, .jpg, .jpeg, .gif" onChange={this.handleImageUpload}/>
              </div>
              <div className='w-full md:w-1/2 order-2 md:pl-4'>
                <div className="flex items-center space-x-3 py-4 md:pt-0">
                  <img className="object-cover object-center w-10 h-10 rounded-full border border-red-300 cursor-pointer" src="/images/placeholder-profile-pic.jpeg" alt="Profile picture" />
                  <div className="space-y-1 font-semibold">
                    <div className='cursor-pointer'>sushi_lover</div>
                  </div>
                </div>
                <div className="py-4 border-b border-gray-200">
                  <textarea required type="text" name="caption" placeholder="Write a caption"
                    value={this.state.caption} onChange={this.handleCaptionChange}
                    className='bg-wrapper' cols={40} rows={2} />
                </div>
                <div className="py-4 border-b border-gray-200">
                  <input type="text" name="location" placeholder='Add location'
                    value={this.state.location} onChange={this.handleLocationChange}
                    className='bg-wrapper' />
                </div>
                <div className="py-4">
                  <ul id="isBought" className="filter-switch inline-flex items-center h-10 p-1 space-x-1 rounded-md font-semibold text-blue-600">
                    <li className="filter-switch-item flex h-8 bg-gray-300x">
                      <input onChange={this.handleIsBoughtChange} checked={isBought === false} type="radio" name="isBought" id="cooked" value='cooked' className="sr-only" required />
                      <label htmlFor="cooked" className="border-2 h-9 py-1 px-2 text-sm leading-6 text-gray-600 hover:text-gray-800 bg-white rounded shadow">
                        Home-cooked
                      </label>
                    </li>
                    <li className="filter-switch-item flex relative h-8 bg-gray-300x">
                      <input onChange={this.handleIsBoughtChange} checked={isBought === true} type="radio" name="isBought" id="bought" value='bought' className="sr-only" required />
                      <label htmlFor="bought" className="border-2 h-9 py-1 px-2 text-sm leading-6 text-gray-600 hover:text-gray-800 bg-white rounded shadow">
                        Bought
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="py-4 flex flex-row-reverse">
                  <button type="submit" name='share' className='text-blue-600'>
                    {this.props.postId ? 'Save' : 'Share'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}
