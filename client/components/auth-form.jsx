import React, { useState, useRef } from 'react';

const AuthForm = props => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    imagePreview: '/images/placeholder-profile-image.jpeg'
  });
  const fileInputRef = useRef(null);
  const { username, password, imagePreview } = userInfo;
  const { action, onSignIn } = props;

  const welcomeMessage =
    action === 'sign-up'
      ? 'Sign up to see photos of delicious food.'
      : 'Please sign in to continue.';
  const submitButtonText = action === 'sign-up' ? 'Sign Up' : 'Log In';
  const footerMessage =
    action === 'sign-up'
      ? 'Already have an account?'
      : "Don't have an account?";
  const footerLink = action === 'sign-up' ? 'Log in' : 'Sign up';

  const handleChange = event => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleImageUpload = event => {
    setUserInfo({
      ...userInfo,
      imagePreview: URL.createObjectURL(fileInputRef.current.files[0])
    });
  };

  const handleDemoLogin = () => {
    setUserInfo({
      username: 'average_eater',
      password: 'average_eater'
    });
    window.location.hash = '#sign-in';
  };

  const handleSubmit = event => {
    const { username, password } = userInfo;
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    if (action === 'sign-up') {
      formData.append('image', fileInputRef.current.files[0]);
      fetch('/api/auth/sign-up', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(result => {
          setUserInfo({
            username: '',
            password: '',
            imagePreview: '/images/placeholder-profile-image.jpeg'
          });
          fileInputRef.current.value = null;
          if (!result.error) {
            window.location.hash = 'sign-in';
          }
        })
        .catch(err => console.error(err));
    } else if (action === 'sign-in') {
      fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
        .then(response => response.json())
        .then(result => {
          setUserInfo({
            username: '',
            password: '',
            imagePreview: '/images/placeholder-profile-image.jpeg'
          });
          onSignIn(result);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="absolute w-full h-full bg-zinc-100 ">
      <div
        className="flex content-center items-center justify-center h-full
              mx-auto px-4 drop-shadow-md w-96 md:w-[800px]"
      >
        <div
          className="md:w-[55%] py-4 px-4 relative flex flex-col w-full shadow-sm rounded-sm
              bg-white border border-slate-300"
        >
          <div className="rounded-t px-6 md:px-10 py-4">
            <h1 className="text-[#262626] styled-font text-4xl text-center pb-4">
              Foodies
            </h1>
            <h2 className="text-center border-b-2 border-slate-200 pb-4 text-gray-500 font-semibold">
              {welcomeMessage}
            </h2>
          </div>
          <div className="flex-auto px-4 md:px-10 pb-6">
            <form onSubmit={handleSubmit}>
              <div className="flex w-full justify-center my-1">
                {action === 'sign-up' && (
                  <label
                    htmlFor="image"
                    className="items-center relative flex flex-col mb-2"
                  >
                    <img
                      className="w-12 h-12 rounded-full object-cover object-center border border-gray-300
                        hover:border-slate-400 z-50 mb-1 cursor-pointer"
                      src={imagePreview}
                      alt="Placeholder image"
                    />
                    <a className="cursor-pointer text-[#0095f6] hover:text-[#008ae3] font-medium">
                      Edit photo
                    </a>
                    <input
                      ref={fileInputRef}
                      className="inset-center hidden cursor-pointer"
                      type="file"
                      id="image"
                      name="image"
                      accept=".png, .jpg, .jpeg, .gif"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="username"
                  onChange={handleChange}
                >
                  Username
                </label>
                <input
                  type="text"
                  className="border-2 border-gray-200 px-3 py-3 text-gray-700 bg-white
                      rounded text-sm shadow focus:outline-none focus:ring-2 ring-sky-600 w-full border-opacity-50"
                  placeholder="Username"
                  id="username"
                  name="username"
                  required
                  value={username}
                  onChange={handleChange}
                />
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="px-3 py-3 text-gray-700 bg-white rounded text-sm
                      shadow focus:outline-none focus:ring-2 ring-sky-600 w-full border-2 border-gray-200
                      border-opacity-50"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="text-center mt-6">
                <button
                  className={`bg-[#0095f6] text-white hover:bg-[#008ae3] text-sm font-bold uppercase
                    px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full
                    ${(username === '' || password === '') && 'bg-opacity-50'}`}
                  type="submit"
                >
                  {submitButtonText}
                </button>
              </div>
            </form>
            <div className="text-center text-[#262626] pt-4">
              <p>
                {footerMessage}
                <a
                  className="pl-1 text-[#0095f6] hover:text-[#008ae3] hover:scale-105"
                  href={action === 'sign-up' ? '#sign-in' : '#sign-up'}
                >
                  {footerLink}
                </a>
              </p>
              <button
                onClick={handleDemoLogin}
                className="mt-4 text-sm pl-1 text-[#0095f6]
                  hover:text-[#008ae3] hover:scale-105 cursor-pointer"
              >
                Demo Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
