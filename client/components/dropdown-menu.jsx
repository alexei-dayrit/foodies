import React from 'react';
import ChevronDownIcon from './svg-assets/chevron-down-icon';

export default class DropdownMenu extends React.Component {
  render() {
    const { handleDesktopDropdownToggle, showDesktopDropdown, handleSignOut, user } = this.props;
    return (
      <div>
        <button onClick={handleDesktopDropdownToggle}
          className="flex justify-between items-center pr-4 pl-2 w-full font-semibold
            md:p-0 md:w-auto relative hover:text-gray-600 hover:scale-105 uppercase"
        >My Profile
          <ChevronDownIcon />
        </button>
        {showDesktopDropdown && (
          <div className="absolute w-36 mt-2 rounded divide-y shadow bg-[#ebebeb] divide-gray-400">
            <ul className="py-1 text-sm text-[#262626]">
              <li>
                <a className="block py-2 px-4 hover:bg-gray-600 hover:text-white"
                  href={`#profile?userId=${user.userId}`}>
                  View Profile
                </a>
              </li>
            </ul>
            <div className="py-1 ">
              <button onClick={handleSignOut} className="w-full block py-2 px-4 text-sm
                text-[#262626] text-left hover:bg-gray-600 hover:text-white font-semibold uppercase">
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}