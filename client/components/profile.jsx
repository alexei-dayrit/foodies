import React from 'react';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <div className='w-96 md:w-[800px] p-8 m-auto'>
          <div className='bg-wrapper flex flex-wrap p-2 rounded-xl border border-gray-100'>
            <div className='w-[25%] md:w-1/3 order-1 flex items-center md:justify-end'>
              <img className="w-[75px] h-[75px] md:w-[120px] md:h-[120px] border-red-300 rounded-full border object-cover"
                src="/images/placeholder-profile-pic.jpeg" alt="Profile picture" />
            </div>
            <div className="w-[75%] md:w-2/3 order-2 pt-2 text-sm flex flex-wrap items-center md:justify-center text-center">
              <div className='w-1/3 md:w-[22%]'>
                <p>0</p>
                <p>Posts</p>
              </div>
              <div className='w-1/3 md:w-[22%]'>
                <p>0</p>
                <p>Followers</p>
              </div>
              <div className='w-1/3 md:w-[22%]'>
                <p>0</p>
                <p>Following</p>
              </div>
              <div className="w-full md:w-3/4 flex justify-evenly md:justify-center mt-4 md:text-lg">
                <div className="w-1/3">
                  <p className='font-semibold'>sushi_lover</p>
                </div>
                <div className="w-1/3 text-red-500">
                  <p>Log Out</p>
                </div>
              </div>
            </div>
          </div>
          {/* Post component goes here */}
        </div>

      </>
    );
  }
}
