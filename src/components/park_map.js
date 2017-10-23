import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const style = {
	width: '300px', 
	height: '300px'
}

class GoogleMap extends Component {


	render() {
		return (
			
			<Map 
				google={this.props.google} 
				zoom={12}
				style={style}
				initialCenter={{
            		lat:  38.916554,
            		lng:  -77.025977 
          		}}
			></Map>
			

		);
	}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBisoAT_PP5ybV9UXfIsVktOVF4jopAYgg'
})(GoogleMap);