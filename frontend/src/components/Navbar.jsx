
import React from 'react';
import '../App.css'
import './navbar.css'

const Navbar = (prop) => {
    return (
        <header className="navbar-header">
            <nav className="nav-container">
                <h1 className="text-white text-shadow" >PersonaLLM Tutor</h1>
                <ul className="nav-list">
                    <a onClick={() => prop.handleSequence(0)}><li>UPLOAD</li></a>
                    <a onClick={() => prop.handleSequence(3)}><li>SEARCH</li></a>
                    <a onClick={() => prop.handleShow(true)}><li>ABOUT</li></a>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;