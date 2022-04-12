import React from 'react';
import '../styles.css';
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      isBought: null,
      location: ''
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

  handleIsBoughtClick(event) {
    if (event.target.value === 'bought') {
      this.setState({ isBought: true });
    } else {
      this.setState({ isBought: false });
    }
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <>
        <h1 className='text-2xl'>New Post</h1>
        <form>
          <p>sushi_lover9</p>
          <input type="file" name="image" accept=".png, .jpg, .jpeg, .gif"/>
          <input type="text" name="caption" placeholder="Write a caption..."
                 value={this.state.caption} onChange={this.handleCaptionChange}/>
          <input type="text" name="location" placeholder='Add location'
                 value={this.state.location} onChange={this.handleLocationChange}/>

          <input type="radio" name="isBought" id='cooked' value='cooked'
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
