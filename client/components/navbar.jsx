import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarOpen: false
    };
    this.handleNavbarChange = this.handleNavbarChange.bind(this);
  }

  handleNavbarChange(event) {
    const navbarOpen = this.state.navbarOpen;
    if (navbarOpen) {
      this.setState({ navbarOpen: false });
    } else {
      this.setState({ navbarOpen: true });
    }
  }

  render() {
    return (
      <>
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-zinc-200 border border-gray-200">
          <div className="w-96 md:w-[800px] m-auto container px-4 flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
              <a className="pl-2 styled-font text-3xl leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
                href="#">
                Foodies
              </a>
              <button className="cursor-pointer leading-none md:hidden"
                onClick={this.handleNavbarChange}>
                {!this.state.navbarOpen
                  ? <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                }
              </button>
            </div>
            <div className={'md:flex flex-grow items-center' + (this.state.navbarOpen ? ' flex' : ' hidden')}>
              <ul className="flex flex-col md:flex-row list-none md:ml-auto">
                <li>
                  <a onClick={this.handleNavbarChange} className="px-3 py-2 flex items-center uppercase leading-snug  hover:opacity-75"
                     href="#">
                    <span className="ml-2">Home</span>
                  </a>
                </li>
                <li>
                  <a onClick={this.handleNavbarChange} className="px-3 py-2 flex items-center uppercase leading-snug hover:opacity-75"
                    href="#form">
                    <span className="ml-2">Add Post</span>
                  </a>
                </li>
                <li>
                  <a onClick={this.handleNavbarChange} className='px-3 pt-1 flex items-center uppercase leading-snughover:opacity-75'
                    href="#profile">
                    <img className="ml-2 w-[35px] h-[35px] border-red-300 rounded-full border object-cover hidden md:inline"
                      src="/images/placeholder-profile-pic.jpeg" alt="Profile picture" />
                    <span className='ml-2 md:hidden'>My Profile</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
