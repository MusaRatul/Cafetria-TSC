import React, { useContext, useState } from 'react'
import { Link, Outlet, useNavigate, useNavigation } from 'react-router-dom'
import './main.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Dropdown from 'react-bootstrap/Dropdown';
import { MyContext } from '../MyContext';
const Main = () => {
    const [show, setShow] = useState(false);
    let { flag, setFlag } = useContext(MyContext);
    let { adminflag, setAdminflag } = useContext(MyContext);
    let {userflag,setUserflag}=useContext(MyContext);
    let {userEmail,setUserEmail}=useContext(MyContext);
    let [toggle,setToggle]=useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showCateg, setShowCateg] = useState(false);
     var isadminloggedIn=localStorage.getItem("adminloggedIn");
     var isuserloggedIn=localStorage.getItem("userloggedIn")
   const history=useNavigate();
    const handleClick = () => {
        setShowCateg(true);
    }
    const logout=()=>{
        localStorage.setItem("adminloggedIn","false");
        localStorage.setItem("userloggedIn","false");
        setFlag(false);
        setAdminflag(false);
        setUserflag(false);
        history('/')
    }
    return (
        <div id='body'>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <div className="container-fluid">
                        <h4>TSC-Cafeteria</h4>
                        <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"  >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link   link-button" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link link-button" to="Cart">Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link link-button" to="Foods" onClick={handleClick}>Foods</Link>
                                </li>
                                {(isuserloggedIn==="true"||userflag === 1) && (<div className="login-register d-flex me-2 nav-item">
                                    <Link className="nav-link" >{userEmail}</Link>
                                    <img className='link-button' src='/Images/icons/log-out.gif' alt='' onClick={logout} style={{height:"30px", width:"30px"}}></img>
                                </div>)}
                                {(isadminloggedIn==="true"|| adminflag === 1 )&& (<div className="login-register d-flex me-2  nav-item">
                                    <Link className="nav-link link-button" to="Admin">Admin</Link>
                                    <img src='/Images/icons/log-out.gif' alt='' onClick={logout} style={{height:"30px", width:"30px"}} className='link-button ms-2'></img>
                                </div>)}
                                
                                {(flag === false) && (<div className='login-register d-flex'>
                                    <li className="nav-item link-button">
                                        <Link className="nav-link link-button" to="./Login">Log In</Link>
                                    </li>
                                    <li className="nav-item ms-2">
                                        <Link className="nav-link link-button" to="./Register">Register</Link>
                                    </li>
                                </div>)}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <Outlet>

            </Outlet>
            <footer className='d-flex justify-content-center align-items-center' id='footer'>
                <Link style={{color:"black",textDecoration:"none"}} className='link-button' onClick={handleShow}>
                    Contact Us
                </Link>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>You can contact us by:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Email: zh.himel.2002@gmail.com</p>
                        <p>Phone: 01737656141</p>
                        <p>Email: musa.ratul.2001@gmail.com</p>
                        <p>Phone: 01737653344</p>
                        <p>Email: rashed.amin.2000@gmail.com</p>
                        <p>Phone: 01737623423</p>
                    </Modal.Body>

                </Modal>

            </footer>
        </div>
    )
}

export default Main
