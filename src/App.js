import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div className="App">
          <MuiThemeProvider>
              <AppBar title="WeatherPug" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
          </MuiThemeProvider>

          <Search />
      </div>
    );
  }
}

export default App;
