import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('api/posts')
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts: posts });
        console.log('posts State:', this.state.posts);
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
