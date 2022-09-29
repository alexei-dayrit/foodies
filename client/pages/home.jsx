import React, { useState, useEffect, useContext } from 'react';
import Post from '../components/post';
import Navbar from '../components/navbar';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

const Home = () => {
  const { user } = useContext(AppContext);
  if (!user) return <Redirect to="sign-in" />;
  let filteredPosts = null;

  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

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

  if (searchQuery) {
    filteredPosts = posts.filter(post => (
      post.username.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />
      <div className='sm:w-96 md:w-[768px] lg:w-[900px] p-2 m-auto mt-8'>
        {!searchQuery
          ? posts.map(post => {
            return (
              <div key={post.postId} className='my-4'>
                <Post post={post} />
              </div>
            );
          })
          : filteredPosts.map(post => {
            return (
              <div key={post.postId} className='my-4'>
                <Post post={post} />
              </div>
            );
          })
        }
      </div>
    </>
  );
};

export default Home;
