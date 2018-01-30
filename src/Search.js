import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import getWeather from './api';
import './WeatherBox.css';


class Search extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		zipcode: '', 
  		weather: 'TEST', 
  		show: false,
  		isMapHidden: true,
  		img: '',
  		status: ''
  	};

  	// Manually binding this to the method
  	this.handleChange = this.handleChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  	this.submitZipCode = this.submitZipCode.bind(this);
  }

  handleChange(event) {
  	const { value } = event.target;
  	this.setState({ zipcode: value });
  }

  handleSubmit(zipcode) {
  	getWeather(zipcode)
  		.then(response => {
  			this.setState({ zipcode });
  			this.setState({ weather: response });
  			this.setState({ show: true });
  			// Figure out which icon img to use for the weather
  			let icon = this.imgPicker(response.status);
  		}).catch(err => {
  			// Upon error, hide display, alert on windows, and reload app
  			this.setState({ show: false });
  			window.alert("Invalid zipcode, please enter again");
			window.location.reload();
  		});
  }

  submitZipCode(event) {
  	event.preventDefault();
  	const { zipcode } = this.state;
  	this.handleSubmit(zipcode);

  }

  showMap() {
  	this.setState({
  		isMapHidden: !this.state.isMapHidden
  	})
  }

  // An image selector to pick a weather icon
  imgPicker(status) {
  	console.log(status);
  	let condition = status[0].toString();
  	if (condition === "800") {
 		this.setState({ img: './sunny.png' });
  	}
 	else if (condition.match(/^8/)) {
 		this.setState({ img: './cloud.png' });
 	}
 	else if (condition.match(/^[3|5]/)) {
 		this.setState({ img: './rain.png' });
 	}
 	else if (condition.match(/^7/)) {
 		this.setState({ img: './misty.png' });
 	}
 	else if (condition.match(/^2/)) {
		this.setState({ img: './lightning.png' });
 	}
 	else if (condition.match(/^6/)) {
 		this.setState({ img: './snow.png' });
 	}
 	this.setState({ status: status[1]});
  }

  render() {
    return(
    	<div className="search-form">
	    	<form onSubmit={this.submitZipCode}>
	    		<MuiThemeProvider>
	    			<TextField id="zip" hintText="Your 5-digit zipcode" 
	    				floatingLabelText="Location" maxLength="5" 
	    				pattern="[0-9]{5}" value={this.state.value}
	    				onChange={this.handleChange} />
	    			<br />
	    			<RaisedButton type="submit" label="ASK THE PUG" 
	    				primary={true} onSubmit={this.handleSubmit}/>
	    		</MuiThemeProvider>
	    	</form>
	    	<ToggleDisplay show={this.state.show}>
		    	<div className="weather-card">
			    	<div id="weather-location">
			    		<span id="weather-city">{this.state.weather.location} </span>
			    	</div>
			    	<div id="weather-icon">		<img src={this.state.img} id="icon" alt="icon"/>	</div>
			    	<div id="weather-status">	{this.state.status}		</div>
			    	<div id="weather-f">		{this.state.weather.fahrenheit}	</div>
		    	</div>
		    </ToggleDisplay>
		    <div className="pug">
			    <img src="./pug.png" id="pug"/>
		    </div>
	    	<div>
	    		<button onClick={this.showMap.bind(this)}>
	    			Show Location on Map
	    		</button>
	    		{!this.state.isMapHidden && <Display />}
	    	</div>
    	</div>
    );
  }
}

// A Child Component for Display
const Display = () => (
	<div className="Display">
		MAP
	</div>
)

export default Search;