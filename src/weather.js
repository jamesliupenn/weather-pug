// Constructor for the Weather Class
function Weather(data) {
	this.coord = data.coord;
	this.location = data.name;
	this.fahrenheit = ktoF(data.main.temp) + "°F";
	this.celsius = ktoC(data.main.temp) + "°C";
	this.status = parseStatus(data.weather);
	this.humidity = data.main.humidity;
}

// Methods
function ktoF(kelv) {
	return Math.round(kelv * 9/5 - 459.67);
}

function ktoC(kelv) {
	return Math.round(kelv - 273.15);
}

function parseStatus(array) {
	let condition = [];
	array.forEach((elem) => {
		condition.push(elem.id)
		condition.push(elem.main);
	});
	return condition;
}

// export the class
module.exports = Weather;