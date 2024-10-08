import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./sidebar.css";

const Sidebar = ({ open, setOpen }) => {

    const { currentUser } = useContext(AuthContext);

    const isCurrentUserValid = currentUser && Object.keys(currentUser).length > 0;

    const handleLogout = ()=>{
        window.open("http://localhost:8000/logout","_self");
        localStorage.clear();
    }

    const handleClose = () => {
        setOpen(!open);
    };

    return (
        <div className={`sidenav ${open ? 'active' : ''}`}>
            <ul className='menus'>
                {
                    isCurrentUserValid && currentUser?.user?.role === 'admin' && (
                        <>
                            <li onClick={handleClose}>
                                &times;
                            </li>
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
                            <li onClick={handleClose}>
                                &times;
                            </li>
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
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingOne">
                                        <div className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            {currentUser?.user?.displayName}
                                        </div>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body" onClick={handleLogout}>Logout</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </ul>
        </div>
    );
};

export default Sidebar;
