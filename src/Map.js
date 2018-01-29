import React, { Component } from 'react';

class Map extends Component {
  // constructor(props) {
  //   super(props);
  // }
   
  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadJS('https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap')
  }

  initMap() {
    // map = new google.maps.Map(this.refs.map.getDOMNode(), { ... });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

var loadJS = function(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

export default Map;