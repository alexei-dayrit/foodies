import React from 'react';
import '../styles.css';
export default class Form extends React.Component {

  render() {
    return (
      <>
        <h1 className='text-2xl'>New Post</h1>
        <form>
        <p>sushi_lover9</p>
          <input type="file" name="image" accept=".png, .jpg, .jpeg, .gif" />
          <input type="text" name="location" placeholder='Add location'/>
          <input type="radio" name="isBought" id='cooked' value='cooked'/>
          <label htmlFor='cooked'>Home-cooked</label>
          <input type="radio" name="isBought" id='bought' value='cooked'/>
          <label htmlFor='bought'>Bought</label>
          <button type="submit" name='share'>
            Share
          </button>
        </form>
      </>
    );
  }
}
