import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Button from '../../components/Button/Button';
import RadioInput from '../../components/RadioInput/RadioInput';
import {ReactComponent as BeerLogo} from './icons/icons8-beer-mug.svg';
import {ReactComponent as DiningLogo} from './icons/icons8-dining-room.svg';
import {ReactComponent as ShoppingLogo} from './icons/icons8-market-square.svg';
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
        <div className="row landing">
            <div className="container col-md-6 offset-md-3 col-12" id="landing-card">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">Let's find the stuff...</h3>
                        <form>
                            <div className="form-row">
                                <div className="col">
                                    <RadioInput
                                        handleCheck={handleCheck}
                                        isChecked={amenity === "restaurant" ? true : false}
                                        name="amenity"
                                        id="restaurant"
                                        value="restaurant"
                                        // logo={DiningLogo}
                                    >
                                        <DiningLogo />
                                    </RadioInput>
                                    <RadioInput
                                        handleCheck={handleCheck}
                                        isChecked={amenity === "bar" ? true : false}
                                        name="amenity"
                                        id="bar"
                                        value="bar"
                                    >
                                        <BeerLogo />
                                    </RadioInput>
                                    <RadioInput
                                        handleCheck={handleCheck}
                                        isChecked={amenity === "shop" ? true : false}
                                        name="amenity"
                                        id="shop"
                                        value="shop"
                                    >
                                        <ShoppingLogo />
                                    </RadioInput>
                                </div>
                            </div>
                            <Link to="/main">
                                <Button
                                    extraClass="find-me-button"
                                    type="button"
                                    handleClick={handleClick}
                                >
                                    Find the hot-spots!
                                </Button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;