var NO_LOCATION = 'ANTARCTICA';
var geoStarted = false;
var callbacks = [];
var cachedLocation = undefined;

function getUserLocation(callback) {
	// Only start one geolocation lookup
	if(!geoStarted) {
		geoStarted = true;
		initiate_geolocation();
	}
	
	if(cachedLocation != undefined) {
		callback(cachedLocation);
	} else {
		cachedLocation.push(callback);
	}
}

function initiate_geolocation() {
	navigator.geolocation.getCurrentPosition(handle_geolocation_query, handle_errors);
}

function handle_errors(error) {
	setLocation(NO_LOCATION);
}

function handle_geolocation_query(position) {
	var geocoder = new google.maps.Geocoder;
	var latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
	
	geocoder.geocode({'location': latlng}, function(results, status) {
	  if (status === 'OK') {
		var addrComponents = results[0].address_components;
		var locationSet = false;
		for(var i = 0; i<addrComponents.length; i++) {
			if(addrComponents[i].types[0] == 'locality') {
				setLocation(addrComponents[i].long_name);
				locationSet = true;
				break;
			} else if(addrComponents[i].types[0] == 'country') {
				setLocation(addrComponents[i].long_name);
				locationSet = true;
				break;
			}
		}
		if(!locationSet) {
			setLocation(NO_LOCATION);
		}
	  } else {
		setLocation(NO_LOCATION);
	  }
	});
}

function setLocation(place) {
	cachedLocation = place;
	
	for(var i = 0; i<callbacks.length; i++) {
		callbacks[i](place);
	}
	callbacks = [];
}