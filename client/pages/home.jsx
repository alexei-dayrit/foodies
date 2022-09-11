import React, { useState, useEffect, useContext } from 'react';
import Post from '../components/post';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

const Home = props => {
  const { user } = useContext(AppContext);
  if (!user) return <Redirect to="sign-in" />;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem('foodies-jwt');
    fetch('/api/posts', {
      headers: { 'X-Access-Token': token }
    })
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='sm:w-96 md:w-[768px] lg:w-[900px] p-2 m-auto mt-8'>
      {posts.map(post => {
        return (
          <div key={post.postId} className='my-4'>
            <Post post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
