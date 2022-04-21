import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      imagePreview: '/images/placeholder-profile-image.jpeg'
    };
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleImageUpload(event) {
    this.setState({
      imagePreview: URL.createObjectURL(this.fileInputRef.current.files[0])
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', this.fileInputRef.current.files[0]);
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    fetch('/api/auth/sign-up', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          username: '',
          password: '',
          imagePreview: '/images/placeholder-profile-image.jpeg'
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  render() {
    const { password, username, imagePreview } = this.state;
    const { handleChange, handleSubmit, handleImageUpload } = this;
    const welcomeMessage = this.props.action === 'sign-up'
      ? 'Sign up to see photos of delicious food.'
      : 'Please sign in to continue.';
    const submitButtonText = this.props.action === 'sign-up'
      ? 'Sign Up'
      : 'Log In';
    const footerMessage = this.props.action === 'sign-up'
      ? 'Already have an account?'
      : 'Don\'t have an account?';
    const footerLink = this.props.action === 'sign-up'
      ? 'Log in'
      : 'Sign up';

    return (
      <>
        <div className="absolute w-full h-full bg-zinc-100 ">
          <div className="flex content-center items-center justify-center h-full
              mx-auto px-4 drop-shadow-md w-96 md:w-[800px]">
            <div className="md:w-[55%] py-4 px-4 relative flex flex-col w-full shadow-lg rounded-lg bg-white border-2 border-gray-200">
              <div className="rounded-t px-6 md:px-10 py-4">
                <h1 className="text-[#262626] styled-font text-4xl text-center pb-4"
                  >Foodies
                </h1>
                <h2 className='text-center border-b-2 border-gray-200 pb-4 text-gray-500 font-semibold'>
                  {welcomeMessage}
                </h2>
              </div>
              <div className="flex-auto px-4 md:px-10 pb-6">
                <form onSubmit={handleSubmit}>
                  <div className='flex w-full justify-center my-1'>
                    <label htmlFor='profilePic' className='items-center relative flex flex-col mb-2'>
                      <img className='w-12 h-12 rounded-full object-cover border border-gray-400
                        hover:border-[#0095f6] border-opacity-50 z-50 mb-1 cursor-pointer' src={imagePreview} alt='Placeholder image'
                      />
                      <a className='cursor-pointer text-[#0095f6] hover:text-[#008ae3] font-medium'>
                        Edit photo
                      </a>
                      <input ref={this.fileInputRef} className='inset-center hidden cursor-pointer'
                        type="file" id="profilePic" name="profilePic"
                        accept=".png, .jpg, .jpeg, .gif" onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="username" onChange={handleChange}
                    >Username
                    </label>
                    <input type="text" className="border-2 border-gray-200 px-3 py-3 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring-2 ring-sky-600 w-full border-opacity-50" placeholder="Username" id='username' name='username'
                      value={username} onChange={handleChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="password"
                    >Password
                    </label>
                    <input type="password" className="px-3 py-3 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring-2 ring-sky-600 w-full border-2 border-gray-200 border-opacity-50" placeholder="Password" id='password' name='password'
                      value={password} onChange={handleChange}
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button className="bg-[#0095f6] text-white hover:bg-[#008ae3]
                      text-sm font-bold uppercase px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full"
                      type='submit'
                    >{submitButtonText}
                    </button>
                  </div>
                </form>
                <div className="text-center text-[#262626] pt-4">
                  <p>
                    {footerMessage}
                    <button href='' className='pl-1 text-[#0095f6] hover:text-[#008ae3] hover:scale-105'>
                      {footerLink}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
