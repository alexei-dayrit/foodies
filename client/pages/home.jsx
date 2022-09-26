import React, { useContext } from 'react';
import Post from '../components/post';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

const Home = ({ posts }) => {
  const { user } = useContext(AppContext);
  if (!user) return <Redirect to="sign-in" />;

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
