import React from 'react';

export default class Home extends React.Component {
  componentDidMount() {
    fetch('api/posts')
      .then(res => res.json())
      .then(posts => {

      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <div className='text-3xl text-center mt-4'>HOME PAGE</div>
      </>
    );
  }
}
