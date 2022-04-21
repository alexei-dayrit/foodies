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
  }

  render() {
    const imagePreview = this.state.imagePreview;
    return (
      <>
        <div className="absolute w-full h-[80%]">
          <div className="flex content-center items-center justify-center h-full
              mx-auto px-4 drop-shadow-md w-96 md:w-[800px]">
            <div className="md:w-[55%] px-4 relative flex flex-col w-full mb-6 shadow-lg rounded-lg bg-zinc-100">
              <div className="rounded-t px-6 md:px-10 py-6">
                <h1 className="text-[#262626] pl-2 styled-font text-4xl text-center pb-5
                  border-b border-gray-400"
                >Foodies
                </h1>
              </div>
              <div className="flex-auto px-4 md:px-10 py-6 pt-0">
                <form>
                  <div className='flex w-full justify-center mb-2'>
                    <label htmlFor='profilePic' className='items-center relative flex flex-col mb-2'>
                      <img className='w-10 h-10 rounded-full object-cover border border-gray-400
                        hover:border-[#0095f6] border-opacity-50 z-50 mb-1 cursor-pointer' src={imagePreview} alt='Placeholder image'
                      />
                      <a className='cursor-pointer text-[#0095f6] hover:text-[#008ae3] font-medium'>
                        Edit photo
                      </a>
                      <input ref={this.fileInputRef} className='inset-center hidden cursor-pointer'
                        type="file" id="profilePic" name="profilePic"
                        accept=".png, .jpg, .jpeg, .gif" onChange={this.handleImageUpload}
                      />
                    </label>
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username" onChange={this.handleChange}
                    >Username
                    </label>
                    <input type="text" className="border-0 px-3 py-3 text-gray-700
                      bg-white rounded text-sm shadow focus:outline-none focus:ring-2 ring-sky-600 w-full"
                      placeholder="Username" id='username' name='username' onChange={this.handleChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >Password
                    </label>
                    <input type="password" className="border-0 px-3 py-3 text-gray-700
                      bg-white rounded text-sm shadow focus:outline-none focus:ring-2 ring-sky-600 w-full"
                      placeholder="Password" id='password' name='password' onChange={this.handleChange}
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button className="bg-[#0095f6] text-white hover:bg-[#008ae3]
                      text-sm font-bold uppercase px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full"
                      type='submit'
                    >Sign Up
                    </button>
                  </div>
                </form>
                <div className="text-center text-[#262626] pt-4">
                  <p>
                    Have an account?
                    <button href='' className='pl-2 text-[#0095f6] hover:text-[#008ae3] hover:scale-105'>
                      Log in
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
