// Constructor
function Weather(data) {
	this.coord = data.coord;
	this.location = data.name;
	this.temp = data.main.temp;
	this.fahrenheit = ktoF(this.temp);
	this.celsius = ktoC(this.temp);
	this.status = parseStatus(data.weather);
}

// class methods
function ktoF(kelv) {
	return Math.round(kelv * 9/5 - 459.67);
}

function ktoC(kelv) {
	return Math.round(kelv - 273.15);
}

function parseStatus(array) {
	let condition = [];
	array.forEach((elem) => {
		condition.push(elem.main);
	});
	return condition;
}

// export the class
module.exports = Weather;