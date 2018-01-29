const axios = require("axios"); 

const url = "https://api.openweathermap.org/data/2.5/weather?";
const Weather = require("./weather.js");

require('dotenv').config();

function getWeather(zip) {
	return new Promise(
		function (resolve, reject) {
			var response = 
			axios
			.get(url + "APPID=" + process.env.REACT_APP_WEATHER_ID + "&zip=" + zip + ",us")
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