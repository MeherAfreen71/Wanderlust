const map = new mapboxgl.Map({
        // TO MAKE THE MAP APPEAR YOU MUST
        // ADD YOUR ACCESS TOKEN FROM
        // https://account.mapbox.com
        accessToken: mapToken,
        container: 'map', // container ID
        style: "mapbox://styles/mapbox/streets-v12",
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 12 // starting zoom
});

const marker = new mapboxgl.Marker({ color: "Red" })
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h6><i>${listing.location}</i></h6><p><i>Exact location will be provided after booking.</i></p>`))
        .addTo(map);

map.on('load', () => {
        // Load an image from an external URL.
        map.loadImage(
            "/images/icon.png",
            (error, image) => {
                if (error) throw error;

                // Add the image to the map style.
                map.addImage("icon", image);

                // Add a data source containing one point feature.
                map.addSource("point", {
                    'type': 'geojson',
                    'data': {
                        'type': "FeatureCollection",
                        'features': [
                            {
                                'type': "Feature",
                                'geometry': {
                                    'type': "Point",
                                    'coordinates': listing.geometry.coordinates
                                }
                            }
                        ]
                    }
                });

                // Add a layer to use the image to represent the data.
                map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': "point", // reference the data source
                    'layout': {
                        'icon-image': "icon", // reference the image
                        'icon-size': 0.6
                    }
                });
            }
        );
});