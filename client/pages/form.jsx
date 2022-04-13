import React from 'react';
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      location: '',
      isBought: null,
      imagePreview: '/images/placeholder-image-square.jpeg',
      isUploaded: false
    };

    this.fileInputRef = React.createRef();
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleIsBoughtClick = this.handleIsBoughtClick.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCaptionChange(event) {
    this.setState({ caption: event.target.value });
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleIsBoughtClick(event) {
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

    fetch('/api/uploads', {
      method: 'POST',
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
    return (
      <>
        <div className='w-96 md:w-[800px] p-8 m-auto'>
          <h1 className='text-2xl flex justify-center pb-4'>New Post</h1>
          <form onSubmit={this.handleSubmit}>
            <div className='bg-wrapper flex flex-wrap p-3 rounded-xl border border-gray-100'>
              <div className='w-full md:w-1/2 relative md:order-1 order-2'>
                <img className='w-80 md:w-96 h-80 object-cover border border-gray-300' src={imagePreview} alt='Placeholder image' />
                {!this.state.isUploaded &&
                <label htmlFor='image' className='inset-center cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </label>}
                <input ref={this.fileInputRef} className='inset-center opacity-0 cursor-pointer' required type="file" name="image"
                  accept=".png, .jpg, .jpeg, .gif" onChange={this.handleImageUpload}/>
              </div>
              <div className='w-full md:w-1/2 order-3 md:pl-4'>
                <div className="flex items-center space-x-3 sm:order-1 py-4 md:pt-0 border-b border-gray-200">
                  <img className="object-cover w-9 h-9 rounded-full border border-red-300 cursor-pointer" src="/images/placeholder-profile-pic.jpeg" alt="" />
                  <div className="space-y-1 font-semibold">
                    <div className='cursor-pointer'>sushi_lover</div>
                  </div>
                </div>
                <div className="w-full py-4 border-b border-gray-200">
                  <textarea required type="text" name="caption" placeholder="Write a caption..."
                    value={this.state.caption} onChange={this.handleCaptionChange}
                    className='bg-wrapper' cols={40} rows={2} />
                </div>
                <div className="w-full py-4 border-b border-gray-200">
                  <input type="text" name="location" placeholder='Add location'
                    value={this.state.location} onChange={this.handleLocationChange}
                    className='bg-wrapper' />
                </div>
                <div className="w-full py-4">
                  <ul id="isBought" className="filter-switch inline-flex items-center h-10 p-1 space-x-1 rounded-md font-semibold text-blue-600">
                    <li className="filter-switch-item flex h-8 bg-gray-300x">
                      <input onClick={this.handleIsBoughtClick} type="radio" name="isBought" id="cooked" value='cooked' className="sr-only" required />
                      <label htmlFor="cooked" className="border-2 h-9 py-1 px-2 text-sm leading-6 text-gray-600 hover:text-gray-800 bg-white rounded shadow">
                        Home-cooked
                      </label>
                    </li>
                    <li className="filter-switch-item flex relative h-8 bg-gray-300x">
                      <input onClick={this.handleIsBoughtClick} type="radio" name="isBought" id="bought" value='bought' className="sr-only" required />
                      <label htmlFor="bought" className="border-2 h-9 py-1 px-2 text-sm leading-6 text-gray-600 hover:text-gray-800 bg-white rounded shadow">
                        Bought
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="w-full py-4 flex flex-row-reverse">
                  <button type="submit" name='share' className='text-blue-600'>
                    Share
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
