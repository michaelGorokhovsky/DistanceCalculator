/*Michael Gorokhovsky	
	500681974 */
const mapKey = "AIzaSyD3ocEcQmg9Zw6TolLbOJrQnPZpCi2lYQU";

var map, infoWindow;
var wW;
var globalPos;
var marker;
var txtCoordinates;
	function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 0.0, lng: 0.0},
          zoom: 6
        });
		map.addListener('click', function(e) {
		placeMarker(e.latLng, map);
});
        infoWindow = new google.maps.InfoWindow;

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
			globalPos = [position.coords.latitude.toString(), position.coords.longitude.toString()].join(", ");
			document.getElementById("mResult").textContent = globalPos;
			//console.log("global pos is: ", globalPos);
			marker = new google.maps.Marker({
			position: pos,
			map: map,
			title: 'Current Location'
			});
            //infoWindow.setPosition(pos);
            //infoWindow.setContent('Location found.');
            //infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        alert ("Geolocation failed. Please enable location services");

      }
	  
let dropArea = document.getElementById('drop-area');

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files

  handleFiles(files)
}
function handleFiles(files) {
  var file = files[0];
  var reader = new FileReader();
  reader.onload= function (e) {
	  var output = document.getElementById("fileOutput");  
	  var coord = e.target.result;
	  output.textContent= coord;
	  txtCoordinates = output.textContent;
	  webWorking(txtCoordinates);
	  };
	  reader.readAsText(file);
	  
}

function webWorking(coordinates) {
	wW = new Worker("calculateDistance.js");
	wW.addEventListener('message', function(e) {
		var output = document.getElementById("distance");  
		//console.log('Distane is: ', e.data);
		output.textContent= (e.data);
	}, false);
	var wWInput = new Array(coordinates, globalPos);
	wW.postMessage(wWInput); 
}


function proccessFile(evt){
	var file = evt.target.files[0]; 
	if (file) {varreader = new FileReader();
	reader.onload= function(e) {
		alert("There is magic happening!");
		}
		reader.readAsText(file);
		} else { 
		alert("Failed to load file");
		}
}
function placeMarker(position, map) {
	if (marker && marker.setMap) {
    marker.setMap(null);
  }
    marker = new google.maps.Marker({
        position: position,
        map: map
    });
    map.panTo(position);
	globalPos = position.toString().substring(1, position.toString().length-1);
	document.getElementById("mResult").textContent = globalPos;
	webWorking(txtCoordinates);
}
	
