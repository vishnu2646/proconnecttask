import React, { useContext } from 'react'
import "./header.css"
import { NavLink } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'

const Headers = () => {
    
    const { currentUser } = useContext(AuthContext);

    // logoout
    const handleLogout = ()=>{
        window.open("http://localhost:8000/logout","_self");
        localStorage.clear();
    }

    const isCurrentUserValid = currentUser && Object.keys(currentUser).length > 0;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="left">
                    <h1>Pro Connect Task</h1>
                </div>
                <div className="right">
                    <ul className='menus'>
                        {
                            isCurrentUserValid && currentUser?.user?.role === 'admin' && (
                                <>
                                    <li>
                                        <NavLink to="/">
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/">
                                            Employee Master
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/">
                                            Leave Master
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/">
                                            Email setup
                                        </NavLink>
                                    </li>
                                </>
                            )
                        }
                        {
                            isCurrentUserValid && currentUser?.user?.role === 'normal' && (
                                <>
                                    <li>
                                        <NavLink to="/">
                                            Reset Password
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/">
                                            Apply Leave
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/">
                                            Cancel Leave
                                        </NavLink>
                                    </li>
                                </>
                            )   
                        }
                        {
                            isCurrentUserValid && (
                                <>  
                                    <div className="btn-group dropstart">
                                        <img src={currentUser?.user?.image} className='dropdown-toggle' id="dropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "50px", borderRadius: "50%" }} alt="" />
                                        <ul className="dropdown-menu">
                                            <li className="dropdown-item">
                                                {currentUser?.user?.displayName}
                                            </li>
                                            <li className="dropdown-item" onClick={handleLogout}>
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )
                        }
                        {
                            !isCurrentUserValid && (
                                <li>
                                    <NavLink to="/login">
                                        Login
                                    </NavLink>
                                </li>
                            ) 
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Headers