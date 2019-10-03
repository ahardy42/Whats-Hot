import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import L from 'leaflet';
import API from '../../utils/API';
import 'leaflet.locatecontrol';
import 'leaflet.heat';
import './Main.sass';

const Main = ({isMapView, setIsMapView, amenity, match}) => {
    const [myMap, setMyMap] = useState(null);
    const [lc, setLc] = useState([]);
    const [layerControl, setLayerControl] = useState(null);
    const [amenitites, setAmenities] = useState([]);
    const [myLocation, setMyLocation] = useState({});
    useEffect(()=> {
        // render the map and find the user if isMapView is true
        if (isMapView) {
            let baselayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 16,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            });
            let newMap = L.map("map", {
                center: [0, 0],
                zoom: 2,
                layers: [baselayer]
            });
            let newLayerControl = L.control.layers({ "Street": baselayer }).addTo(newMap);
            let locationControl = L.control.locate({
                position: "topleft",
                flyTo: true
            }).addTo(newMap);
            setLc(locationControl);
            setMyMap(newMap);
            setLayerControl(newLayerControl);
        }
    }, [isMapView]);
    // update the state with location and an array for the heatmap
    useEffect(() => {
        if (myMap && isMapView) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    let latLng = [position.coords.latitude, position.coords.longitude];
                    let fetchedBoundaries = API.getBoundary(latLng);
                    let fetchedAmenities = API.getAmenities(latLng, amenity);
                    Promise.all([fetchedAmenities, fetchedBoundaries])
                    .then(values => {
                        setMyLocation(latLng);
                        setAmenities(values[0]);
                        // create city boundary
                        let geoJson = L.geoJSON(values[1].geoJSON, {color : "blue", fill : true}).addTo(myMap);
                        layerControl.addOverlay(geoJson, "city boundary");
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }, (err) => {
                    console.log(err);
                })
            } else {
                console.log("location not supported in your browser");
            }
        }
    }, [myMap]);

    // when there is a populated lc run the lc.start() method
    useEffect(() => {
        if (lc.start) {
            lc.start();
        }
    }, [lc]);

    // function to create the heatmap layer once ameneties have been loaded
    useEffect(() => {
        if (amenitites.length) {
            let heat = L.heatLayer(amenitites).addTo(myMap);
            let locationLatLng = L.latLng(myLocation);
            let arrayForBounds = heat._latlngs.filter(latLng => locationLatLng.distanceTo(latLng) <= 5000);
            myMap.flyToBounds(arrayForBounds);
        }
    }, [amenitites]);

    // componentWillUnmount hook replacement
    useEffect(() => {
        return () => {
            setIsMapView(false);
        };
    }, []);
    if (!isMapView) {
        return <Redirect to="/" />
    }
    return(
        <div className="row map-container">
            <div className="col">
                <div className="map-div" id="map"></div>
            </div>
        </div>
    )
}

export default Main;