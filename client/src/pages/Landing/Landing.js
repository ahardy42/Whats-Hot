import React, {useState} from 'react';
import Button from '../../components/Button/Button';
import RadioInput from '../../components/RadioInput/RadioInput';
import './Landing.sass';

const Landing = ({location, city, amenity, setLocation, setCity, setAmenity, setIsMapView}) => {
    const success = position => {
        let {latitude, longitude} = position.coords;
        setLocation({lat: latitude, lng: longitude});
        setIsMapView(true);
    }
    const error = () => {
        console.log("we couldn't find your position!");
    }
    const handleClick = (event) => {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    const handleCheck = (event) => {
        let {id} = event.target;
        setAmenity(id);
    }
    return(
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title text-center">Let's find the stuff...</h3>
                    <form>
                        <RadioInput
                            handleCheck={handleCheck}
                            isChecked={amenity === "restaurant" ? true : false}
                            name="amenity"
                            id="restaurant"
                            value="restaurant"
                        >
                            Restaurants?
                        </RadioInput>
                        <RadioInput
                            handleCheck={handleCheck}
                            isChecked={amenity === "bar" ? true : false}
                            name="amenity"
                            id="bar"
                            value="bar"
                        >
                            Bars?
                        </RadioInput>
                        <RadioInput
                            handleCheck={handleCheck}
                            isChecked={amenity === "shop" ? true : false}
                            name="amenity"
                            id="shop"
                            value="shop"
                        >
                            Shops?
                        </RadioInput>
                        <Button
                            extraClass="find-me-button"
                            type="button"
                            handleClick={handleClick}
                        >
                            Find the hot-spots!
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Landing;