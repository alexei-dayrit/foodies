import React from 'react';
import '../styles.css';
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      location: '',
      isBought: null
    };
    this.fileInputRef = React.createRef();
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleIsBoughtClick = this.handleIsBoughtClick.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
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
          isBought: null
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <h1 className='text-2xl'>New Post</h1>
        <form onSubmit={this.handleSubmit}>
          <p>sushi_lover9</p>
          <input required type="file" name="image" ref={this.fileInputRef} accept=".png, .jpg, .jpeg, .gif"/>
          <input required type="text" name="caption" placeholder="Write a caption..."
                 value={this.state.caption} onChange={this.handleCaptionChange}/>
          <input type="text" name="location" placeholder='Add location'
                 value={this.state.location} onChange={this.handleLocationChange}/>

          <input required type="radio" name="isBought" id='cooked' value='cooked'
                 onClick={this.handleIsBoughtClick}/>
          <label htmlFor='cooked'>Home-cooked</label>

          <input type="radio" name="isBought" id='bought' value='bought'
                 onClick={this.handleIsBoughtClick}/>
          <label htmlFor='bought'>Bought</label>

          <button type="submit" name='share'>
            Share
          </button>
        </form>
      </>
    );
  }
}
