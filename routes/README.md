## api routes readme

```/api/heatmap```

GET route which expects an object in req.body:

```js
{
    "latLng" : [0.0, 0.0], // from user's location
    "amenity" : "search term"
}
```

returns an array of latLng objects:

```js
[
    {"lat" : 0.0, "lng" : 0.0}, // from business coordinates
    ...
]
```

this route is set up to work with [leaflet-heatmap](https://github.com/Leaflet/Leaflet.heat) plugin. 