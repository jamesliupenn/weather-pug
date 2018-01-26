import React, { Component } from 'react';
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
  		isHidden: true
  	};
  	// this.isHidden = true;

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
  			// this.isHidden = false;
  			this.setState({ zipcode });
  			this.setState({ weather: response });
  			console.log(response);
  		}).catch(err => {
  			window.alert("Invalid zipcode, please enter again");
  			console.log(err);
  			// Need to handle error and redirect back to page
  		});
  }

  submitZipCode(event) {
  	event.preventDefault();
  	const { zipcode } = this.state;
  	this.handleSubmit(zipcode);
  	// this.showMap();
  }

  showMap() {
  	this.setState({
  		isHidden: !this.state.isHidden
  	})
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
	    			<RaisedButton type="submit" label="Search" 
	    				primary={true} onSubmit={this.handleSubmit}/>
	    		</MuiThemeProvider>
	    	</form>
	    	<div className="weather-tags">
		    	<span id="weather-location">{this.state.weather.location}	</span> <br/>
		    	<span id="weather-status">	{this.state.weather.status}		</span> <br/>
		    	<span id="weather-f">		{this.state.weather.fahrenheit}	</span> <br/>
	    	</div>
	    	<div>
	    		<button onClick={this.showMap.bind(this)}>
	    			Show Location on Map
	    		</button>
	    		{!this.state.isHidden && <Display />}
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