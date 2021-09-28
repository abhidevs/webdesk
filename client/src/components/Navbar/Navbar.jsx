import React from "react";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './styles.scss'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <h3 className="logo">WebDesk</h3>
        </div>

        <div className="middle">
          <span>Home</span>
          <span>Notes</span>
          <span>Tasks</span>
          <span>Doubts</span>
        </div>

        <div className="right">
          <div className="profile">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
              alt="profile image"
            />
            <div className="userDetails">
              <span>Jane Doe</span>
              <span>Student</span>
            </div>

            <ArrowDropDownIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
