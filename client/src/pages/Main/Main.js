import React, {useState} from 'react';
import './Main.sass';

const Main = ({location, city, amenity}) => {
    
    return(
        <div className="container">
            <div className="map-div" id="map"></div>
        </div>
    )
}

export default Main;