import React, {useState} from 'react';
import Button from '../../components/Button/Button';
import RadioInput from '../../components/RadioInput/RadioInput';
import './Landing.sass';

const Landing = ({location, city, amenity, setLocation, setCity, setAmenity}) => {
    const success = position => {
        let {latitude, longitude} = position.coords;
        setLocation({lat: latitude, lng: longitude});
    }
    const error = () => {
        console.log("we couldn't find your position!");
    }
    const handleClick = (event) => {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    return(
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title text-center">Let's find the stuff!</h3>
                    <form>
                        <RadioInput>
                            
                        </RadioInput>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Landing;