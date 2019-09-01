import L from 'leaflet';

const mapFuncs = {
    init: (location, zoom) => {
        return L.map("map").setView(location, zoom);
    },
    addTiles: myMap => {
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        }).addTo(myMap)
    },
    loadHeatMap: () => {

    },
    
}

export default mapFuncs;