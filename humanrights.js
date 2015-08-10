L.mapbox.accessToken = 'pk.eyJ1IjoiamVmZnN0ZXJuIiwiYSI6IlAzRFFiN0EifQ.mNWvayrLEw9wULuq0sopyA';
var map = L.mapbox.map('map', 'examples.map-20v6611k')
  .setView([95, 40], 9);

var myLayer = L.mapbox.featureLayer().addTo(map);
var geojson;
var origjson;


// 1gF9_kZduMi_dSF0q9BZyOqTStoNaxXYeMd9pfbnz-Wc     GOOGLE KEY

// this function will get called when the HTML page finishes loading 
$(document).ready(function(){
    // insert code here to initialize the table top
	Tabletop.init( { key: '1gF9_kZduMi_dSF0q9BZyOqTStoNaxXYeMd9pfbnz-Wc', callback: convertToGeoJSON, 
	simpleSheet:true })
	});

// converts a CSV file (what you get from google spreadsheets) to GeoJSON 
// data is the CSV file
function convertToGeoJSON(data) {
	//outputs the data 
    console.log(data);
    origjson = data;
    places = []
    
	
		
		
	
    // insert code to loop through CSV file, extract data, and add it to the map!
	
	for (var i = 0; i < data.length; i++){
		console.log(data[i]);
		
		var toinsert = {
			type: 'Feature',
			properties: {
				title: data[i]["name"],
				description: data[i]["description"],
				'marker-color': '#FF0000',
				'marker-size': 'large',
				'marker-symbol': data[i]["symbol"],
			},
			
		geometry: {
			type: 'Point',
			coordinates: [data[i]["longitude"], data[i]["latitude"]]
		}				
		}
		places.push(toinsert);		
	}
	
    //this looks like the variable that contains all of the information 
    //for our map, right? Trust your instincts because it is!
    geojson = { type: 'FeaturesCollection', features: places};
    setupMap(geojson);
}

function setupMap(geo) {
    myLayer.setGeoJSON(geo); // Adds all of the points to the map
    map.fitBounds(myLayer.getBounds());
}
