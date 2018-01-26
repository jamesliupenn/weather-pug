const axios = require("axios");

const url = "https://api.openweathermap.org/data/2.5/weather?";
const Weather = require("./weather.js");

function getWeather(zip) {
	return new Promise(
		function (resolve, reject) {
			var response = 
			axios
			.get(url + "APPID=f5823bb83b3698f8b5e825d79e11ec75&zip=" + zip + ",us")
			.then(response => {
				let query = new Weather(response.data);
				return query;
			})
			.catch(error => {
				console.log(error);
			})

			resolve(response);
		}
	);
}

module.exports = getWeather;