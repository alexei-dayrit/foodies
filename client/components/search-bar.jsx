import React, { useState, useRef } from 'react';
import SearchIcon from './svg-assets/search-icon';

const SearchBar = ({ posts }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const inputRef = useRef(null);

  const handleClick = () => {
    setIsSearching(prev => !prev);
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    inputRef.current?.blur();
  };

  return (
    <div>
      {isSearching
        ? <form onSubmit={handleSearchSubmit} className='relative'>
          <input ref={inputRef} type='text' className='border rounded-md border-black w-56 p-1' />
          <div onClick={handleClick} className='absolute right-1 top-1'>
            <SearchIcon />
          </div>
        </form>
        : <h2 onClick={handleClick}>Search</h2>
      }
    </div>
  );
};

export default SearchBar;
