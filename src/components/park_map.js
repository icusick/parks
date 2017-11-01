import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

const API_KEY = '4b7edebc57349e5aa4f637a4fe98af59';
const ROOT_URL = 'http://api.openweathermap.org/data/2.5/forecast?appid=' + API_KEY;

const style = {
	width: '300px', 
	height: '300px'
}

class GoogleMap extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lat: "", 
			lon: ""
		}
	}

	componentDidMount() {
		axios.get(`${ROOT_URL}&q=${this.props.city},us`)
			 .then(response => {
			 	console.log("lat" + response);
			 });
		
	}


	render() {
		return (
			
			<Map 
				google={this.props.google} 
				zoom={12}
				style={style}
				initialCenter={{
            		lat:  this.props.lat,
            		lng:  this.props.lon 
          		}}
			></Map>
			

		);
	}
}

// GoogleMap.propTypes = {
//  propArray: PropTypes.array.isRequired, 
//  propBool: PropTypes.bool.isRequired,
//  propFunc: PropTypes.func,
//  propNumber: PropTypes.number,
//  propString: PropTypes.string,
//  propObject: PropTypes.object
// }

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBisoAT_PP5ybV9UXfIsVktOVF4jopAYgg'
})(GoogleMap);