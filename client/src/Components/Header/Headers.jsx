/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState, useContext } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import './header.css';

const Headers = () => {
    const [open, setOpen] = useState(false);

    const [toggleSearch, setToggleSearch] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const isCurrentUserValid = currentUser && Object.keys(currentUser).length > 0;

    const handleSidebar = () => {
        setOpen(!open);
    };

    const handleToggleSearch = () => {
        console.log('toggle');
        setToggleSearch(!toggleSearch);
    }

    return (
        <>
            <header className='header'>
                {isCurrentUserValid && (
                    <div className="container">
                        <a href="/" className='logo'>
                            <img src="/icons/logo.png" alt="logo-img" width="100px" height="50px" />
                        </a>
                        <div className={`search-view ${toggleSearch ? 'active' : ''}`} data-search-view>
                            <div className="search-wrapper">
                                <input type="search" name='search' placeholder='Search City' className='search-field' autoComplete='off' data-search-field />
                                <i className="fa-solid fa-search"></i>

                                <button className="icon-btn leading-icon has-state" aria-label="close search" onClick={handleToggleSearch}>
                                    <i className="fa-solid fa-arrow-left"></i>
                                </button>
                            </div>

                            <div className="search-result">
                                <ul className='view-list'>
                                    <li className="view-item">
                                        <span>
                                            <i className="fa-solid fa-location-crosshairs"></i>
                                        </span>
                                        <div>
                                            <p className="item-title mb-0">Chennai</p>
                                            <p className="label-2 item-subtitle">Tamil Nadu, India</p>
                                        </div>
                                        <a href="/" className="item-link has-state" data-search-toggler></a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {isCurrentUserValid && (
                            <div className="header-actions">
                                <button className="has-state icon-btn" onClick={handleToggleSearch}>
                                    <i className="fa-solid fa-search"></i>
                                </button>

                                <div className='btn-primary-1 has-state' onClick={handleSidebar}>
                                    <i className="fa-solid fa-bars"></i>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </header>
            <Sidebar open={open} setOpen={setOpen} /> {/* Passing open and setOpen */}
        </>
    );
};

export default Headers;
