import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import api from './api';



class Search extends Component {
  constructor(props) {
  	super(props);
  	this.state = {value: ''};

  	this.handleChange = this.handleChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
  	this.setState({value: event.target.value});
  }

  handleSubmit(event) {
  	event.preventDefault();
  	api(this.state.value);
  }

  render() {
    return(
    	<form onSubmit={this.handleSubmit}>
    		<MuiThemeProvider>
    			<TextField id="zip" hintText="Your 5-digit zipcode" 
    				floatingLabelText="Location" maxLength="5" 
    				pattern="[0-9]{5}" value={this.state.value}
    				onChange={this.handleChange} />
    			<br />
    			<RaisedButton type="submit" label="Search" primary={true} />
    		</MuiThemeProvider>
    	</form>
    );
  }
}

export default Search;