import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Main from './pages/Main/Main';
import Landing from './pages/Landing/Landing';
import './App.sass';

const App = () => {
  const [amenity, setAmenity] = useState("");
  const [isMapView, setIsMapView] = useState(false);
  return (
    <Router>
      <NavBar amenity={amenity}/>
      <Switch>
        <Route exact path="/" render={() => <Landing isMapView={isMapView} setIsMapView={setIsMapView} amenity={amenity} setAmenity={setAmenity}/>} />
        <Route exact path="/main" render={() => <Main isMapView={isMapView} setIsMapView={setIsMapView} amenity={amenity}/>} />
      </Switch>
    </Router>
  );
}

export default App;
