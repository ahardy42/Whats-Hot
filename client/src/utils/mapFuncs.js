import L from 'leaflet';
import 'leaflet.locatecontrol';

const mapFuncs = {
    init: (location, zoom) => {
        return L.map("map").setView(location, zoom);
    },
    destroy: myMap => {
        myMap.remove();
    },
    addTiles: myMap => {
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        }).addTo(myMap)
    },
    loadHeatMap: () => {

    },
    addLocationControl: (myMap) => {
        let lc = L.control.locate({
            position: "topleft",
            setView: "once",
            flyTo: true
        }).addTo(myMap);
        return lc;
    },
    locate: (lc) => {
        lc.start();
    }
    
}

export default mapFuncs;