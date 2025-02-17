import React from 'react'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
const navbar = () => {
    const linkclass = ({ isActive }) =>
        isActive 
          ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded px-3 py-2' 
          : 'text-white hover:bg-gray-900 hover:text-white rounded px-3 py-2'
  return (
    <>
    <nav className="bg-[color:#E3A008] border-b border-[color:#E3A008]
">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between">
        <div
          className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >

          <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
            <img
              className="h-10 w-auto"
              src={logo}
              alt="React Jobs"
            />
            <span className="hidden md:block text-white text-2xl font-bold ml-2"
              >React Jobs</span
            >
          </NavLink>
          <div className="md:ml-auto">
            <div className="flex space-x-2">
              <NavLink
                to="/"
                className={linkclass
                  }                >Home
                </NavLink>
              <NavLink
                to="/jobs"
                className={linkclass}
                >Jobs</NavLink>
              <NavLink
                to="/add-job"
                className={linkclass}
                >Add Job

              </NavLink>
              <NavLink
                to="/Test"
                className={linkclass}
                >Test

              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
 
</>

  );
};

export default navbar