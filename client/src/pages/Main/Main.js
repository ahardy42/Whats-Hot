import React, {useState, useEffect} from 'react';
import L from 'leaflet';
import mapFuncs from '../../utils/mapFuncs';
import 'leaflet/dist/leaflet.css';
import './Main.sass';

const Main = ({location, city, amenity}) => {
    const displayMap = () => {
        const myMap = mapFuncs.init(location, 12);
        mapFuncs.addTiles(myMap);
    }
    useEffect(displayMap);
    return(
        <div className="container">
            <div className="map-div" id="map"></div>
        </div>
    )
}

export default Main;