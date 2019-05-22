/*Michael Gorokhovsky	
	500681974 */
self.addEventListener('message', function(e) {
	var currCoord = e.data[1];
	var currLat = currCoord.split(", ")[0];
	var currLong = currCoord.split(", ")[1];
	var documentCoord = e.data[0];
	var documentLat = documentCoord.split(",")[0];
	var documentLong = documentCoord.split(",")[1];
	var dist;
	
	self.postMessage(doHaversine(currLat, currLong, documentLat, documentLong));
	
}, false);

function toRad(num) {
	return num * Math.PI / 180;
}

function doHaversine(lat0, long0, lat1, long1) {
	var x1 = lat1-lat0;
	var distLat = toRad(x1);  
	var x2 = long1-long0;
	var distLong = toRad(x2);  
	var a = Math.sin(distLat/2) * Math.sin(distLat/2) + 
                Math.cos(toRad(lat0)) * Math.cos(toRad(lat1)) * 
                Math.sin(distLong/2) * Math.sin(distLong/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	return c * 6371;
}