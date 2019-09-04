const API = {
    getAmenities: async (latLng, amenities) => {
        let response = await fetch("/api/heatmap", {
            method: "post",
            body: JSON.stringify({latLng: latLng, amenities: amenities}),
            headers: {"Content-Type" : "application/json"}
        });
        let json = await response.json();
        return json
    }
}

export default API;