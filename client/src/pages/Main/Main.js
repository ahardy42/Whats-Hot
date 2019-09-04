import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import L from 'leaflet';
import API from '../../utils/API';
import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
import 'leaflet.locatecontrol';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import './Main.sass';

const Main = ({isMapView, setIsMapView, amenity}) => {
    const [myMap, setMyMap] = useState({});
    const [lc, setLc] = useState({});
    const [amenitites, setAmenities] = useState([]);
    useEffect(()=> {
        // render the map and find the user
        let newMap = L.map("map").setView([0, 0], 2);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 16,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        }).addTo(newMap);
        let locationControl = L.control.locate({
            position: "topleft",
            flyTo: true
        }).addTo(newMap);
        setLc(locationControl);
        setMyMap(newMap);
    }, []);
    // update the state with location and an array for the heatmap
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let latLng = [position.coords.latitude, position.coords.longitude];
                API.getAmenities(latLng, amenity)
                .then(response => {
                    setAmenities(response);
                })
                .catch(err => {
                    console.log(err);
                })
            }, (err) => {
                console.log(err);
            })
        } else {
            console.log("not supported");
        }
    }, []);

    // when there is a populated lc run the lc.start() method
    useEffect(() => {
        if (lc.start) {
            lc.start();
        }
    }, [lc]);

    // function to create the heatmap layer once ameneties have been loaded
    useEffect(() => {
        if (amenitites.length) {
            L.heatLayer(amenitites).addTo(myMap);
        }
    }, [amenitites]);

    // componentWillUnmount hook replacement
    useEffect(() => {
        return () => {
            if (lc.stop) {
                lc.stop();
            }
            setMyMap({});
            setIsMapView(false);
        };
    }, []);
    if (!isMapView) {
        return <Redirect to="/" />
    }
    return(
        <div className="container">
            <div className="map-div" id="map"></div>
        </div>
    )
}

export default Main;