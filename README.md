# Whats-Hot
Location based Heat Map Generator

## Structure

- Full Stack, MVC design pattern, single page web app
- Views:
  - React front end using hooks for all stateful components
  - MaterializeUI react component library
  - Leaflet.js library for map visualization, heatmap and location plugins
- Controller:
  - API created with express.js
- Model:
  - no stored data, all data coming from Yelp and openstreetmap
  
  ## What it is
  
This app will use your location to provide you with a visual representation of nearby amenities. The app solves the problem for a traveller who is in a new location, is not sure where to... eat, drink, play and wants to understand where in their location most of these places exist. 

The idea is that you are not searching specifically for a restaurant / bar etc. but, you are finding the location to begin window shopping. 

This idea came from how I find restaurants in a new city:

1. squint at Yelp's map to see where I think most restaurants are located...
2. traveling to that area to walk around and see what looks appealing! 

## How it works

- Yelp's API is searched using paramaters obtained from your mobile browser's geolocation API. 
- The resulting cluster of nearby restaurants' lat / long values are fed into leaflet's heatmap plugin
- The heatmap is viewed as an overlay layer on top of a leaflet baselayer which is being served up by openstreetmap's API
- uses component testing / travis CI for continuous integration of code

## How to install on your machine

1. clone this repo on your machine
2. cd into your repo folder and type ``` npm install``` in your terminal
3. cd into the ```/client``` folder in your repo and, type ```npm install``` in your terminal

the back end is set up to run on port 8080 while react is running on 3000. the project is ready to go! cd back into the root folder and type ```npm start``` in your terminal and away you go!

### Enjoy! 

## Running Example: TBD (to be deployed)
