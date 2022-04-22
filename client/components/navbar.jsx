import React from 'react';
import XMarkIcon from './svg-assets/xmark-icon';
import MenuIcon from './svg-assets/menu-icon';
import DropdownMenu from './dropdown-menu';
import Redirect from './redirect';
import AppContext from '../lib/app-context';
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDesktopDropdown: false,
      showMobileDropdown: false
    };
    this.handleMobileDropdownToggle = this.handleMobileDropdownToggle.bind(this);
    this.handleDesktopDropdownToggle = this.handleDesktopDropdownToggle.bind(this);
  }

  handleDesktopDropdownToggle() {
    this.setState({ showDesktopDropdown: !this.state.showDesktopDropdown });
    this.setState({ showMobileDropdown: false });
  }

  handleMobileDropdownToggle() {
    this.setState({ showMobileDropdown: !this.state.showMobileDropdown });
    this.setState({ showDesktopDropdown: false });
  }

  render() {
    const { handleMobileDropdownToggle, handleDesktopDropdownToggle } = this;
    const { showMobileDropdown, showDesktopDropdown } = this.state;
    const { user, handleSignOut } = this.context;

    if (!user) return <Redirect to="sign-in" />;

    return (
      <>
        <nav className="relative flex flex-wrap items-center justify-between
          px-2 py-3 border-b-2 border-[#dbdbdb] text-[#262626]">
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
                onClick={handleMobileDropdownToggle}>
                {!showMobileDropdown ? <MenuIcon /> : <XMarkIcon />}
              </button>
            </div>
            <div className={`md:flex items-center' ${(showMobileDropdown ? 'flex' : 'hidden')}`}>
              <ul className="flex flex-col md:flex-row list-none md:ml-auto font-semibold">
                <li>
                  <a onClick={handleMobileDropdownToggle} className="px-3 py-2 flex
                    items-center uppercase leading-snug hover:text-gray-600 hover:scale-105" href="#">
                    <span className="ml-2 md:mt-2">Home</span>
                  </a>
                </li>
                <li>
                  <a onClick={handleMobileDropdownToggle} className="px-3 py-2 flex items-center
                    uppercase leading-snug hover:text-gray-600 hover:scale-105"
                    href="#new-post">
                    <span className="ml-2 md:mt-2">Add Post</span>
                  </a>
                </li>
                <li className='md:hidden'>
                  <a onClick={handleMobileDropdownToggle} className="px-3 py-2 flex items-center
                    uppercase leading-snug hover:text-gray-600 hover:scale-105"
                    href={ `#profile?userId=${user.userId}`}>
                    <span className="ml-2 md:mt-2">View Profile</span>
                  </a>
                </li>
                <li className='md:hidden'>
                  <button onClick={handleSignOut} className="text-[#262626] px-3 py-2 flex items-center
                    uppercase leading-snug hover:text-gray-600 hover:scale-105 ml-2 md:mt-2 font-semibold">
                    Sign out
                  </button>
                </li>
                <li className='hidden md:block'>
                  <div onClick={handleDesktopDropdownToggle} className='px-3 py-2 flex items-center
                    uppercase leading-snug md:mt-2'>
                    <DropdownMenu handleDesktopDropdownToggle={handleDesktopDropdownToggle}
                      showDesktopDropdown={showDesktopDropdown} user={user || null}
                      handleSignOut={handleSignOut}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

Navbar.contextType = AppContext;
