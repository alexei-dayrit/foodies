import React from 'react';
import XMarkIcon from './svg-assets/xmark-icon';
import MenuIcon from './svg-assets/menu-icon';
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
        <nav className="relative flex flex-wrap items-center justify-between
          px-2 py-3 bg-zinc-200 border border-gray-200 text-[#262626]">
          <div className="w-96 md:w-[800px] m-auto container px-4 flex flex-wrap
            items-center justify-between">
            <div className="w-full relative flex justify-between md:w-auto md:static
              md:block md:justify-start">
              <a className="pl-2 styled-font text-4xl leading-relaxed
                inline-block mr-4 py-2 whitespace-nowrap hover:scale-105"
                href="#">
                Foodies
              </a>
              <button className="cursor-pointer leading-none md:hidden"
                onClick={this.handleNavbarChange}>
                {!this.state.navbarOpen ? <MenuIcon /> : <XMarkIcon />}
              </button>
            </div>
            <div className={`md:flex items-center' ${(this.state.navbarOpen ? 'flex' : 'hidden')}`}>
              <ul className="flex flex-col md:flex-row list-none md:ml-auto font-semibold">
                <li>
                  <a onClick={this.handleNavbarChange} className="px-3 py-2 flex
                    items-center uppercase leading-snug hover:text-gray-600 hover:scale-105" href="#">
                    <span className="ml-2 md:mt-2">Home</span>
                  </a>
                </li>
                <li>
                  <a onClick={this.handleNavbarChange} className="px-3 py-2 flex items-center
                    uppercase leading-snug hover:text-gray-600 hover:scale-105"
                    href="#new-post">
                    <span className="ml-2 md:mt-2">Add Post</span>
                  </a>
                </li>
                <li>
                  <a onClick={this.handleNavbarChange} className='px-3 py-2 flex items-center
                    uppercase leading-snug hover:text-gray-600 hover:scale-105'
                    href="#profile">
                    <span className='ml-2 md:mt-2'>My Profile</span>
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
