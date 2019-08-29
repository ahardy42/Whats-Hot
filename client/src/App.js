import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Main from './pages/Main/Main';
import Landing from './pages/Landing/Landing';
import './App.sass';

const App = () => {
  const [location, setLocation] = useState({});
  const [amenity, setAmenity] = useState("");
  const [city, setCity] = useState("");
  return (
    <Router>
      <NavBar city={city} amenity={amenity}/>
      <Switch>
        <Route exact path="/" render={() => <Landing location={location} city={city} amenity={amenity} setLocation={setLocation} setAmenity={setAmenity} setCity={setCity}/>} />
        <Route exact path="/main" render={() => <Main location={location} city={city} amenity={amenity}/>} />
      </Switch>
    </Router>
  );
}

export default App;
