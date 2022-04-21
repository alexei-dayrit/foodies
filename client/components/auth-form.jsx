import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <div className="absolute w-full h-[80%]">
          <div className="flex content-center items-center justify-center h-full
              mx-auto px-4 drop-shadow-md w-96 md:w-[800px]">
            <div className="md:w-3/5 px-4 relative flex flex-col w-full mb-6 shadow-lg rounded-lg bg-gray-300">
              <div className="rounded-t px-6 md:px-10 py-6">
                <h1 className="text-[#262626] pl-2 styled-font text-4xl text-center pb-5
                  border-b border-gray-400"
                  >Foodies
                </h1>
              </div>
              <div className="flex-auto px-4 md:px-10 py-6 pt-0">
                <form>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="email"
                      >Email
                    </label>
                    <input type="email" className="border-0 px-3 py-3 text-gray-700
                      bg-white rounded text-sm shadow focus:outline-none focus:ring-2 ring-sky-600 w-full"
                      placeholder="Email" id='email'
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="password"
                      >Password
                    </label>
                    <input type="password" className="border-0 px-3 py-3 text-gray-700
                      bg-white rounded text-sm shadow focus:outline-none focus:ring-2 ring-sky-600 w-full"
                      placeholder="Password" id='password'
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button className="bg-[#0095f6] text-white hover:bg-[#008ae3]
                      text-sm font-bold uppercase px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full"
                      >Log In
                    </button>
                  </div>
                </form>
                <div className="text-center text-[#262626] pt-4">
                  <p>
                    Have an account?
                    <button href='' className='pl-2 text-[#0095f6] hover:text-[#008ae3] hover:scale-105'>
                      Sign up
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
