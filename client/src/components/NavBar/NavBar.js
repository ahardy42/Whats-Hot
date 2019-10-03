import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.sass';

const NavBar = ({ isMapView }) => {
    return (
        <nav className="myNav">
            {isMapView ? (
                <Link to="/">Back to search</Link>
            ) : null}
        </nav>
    )
}

export default NavBar;