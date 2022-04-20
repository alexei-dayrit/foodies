import React from 'react';

export default class Comment extends React.Component {
  render() {
    const { message, commentedAt } = this.props.comment;
    return (
      <>
        <p>{message}</p>
        <p className='text-xs'>{commentedAt}</p>
      </>
    );
  }
}
