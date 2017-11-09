import React, { Component } from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const API_KEY = '4b7edebc57349e5aa4f637a4fe98af59';
const ROOT_URL = 'http://api.openweathermap.org/data/2.5/forecast?appid=' + API_KEY;

const style = {
	width: '300px', 
	height: '300px'
}

class GoogleMap extends Component {
	constructor(props) {
		super(props);

		
	}

	componentDidMount() {
	

       
	}

	render() {
        const initialCenter = {lat: this.props.lat, lng: this.props.lon}
     	console.log("ic is " + initialCenter.lat);
     	if (!initialCenter.lat) {
     		return (<div>Empty</div>)
     	}
		else {
			return (
				
				<Map 
					google={this.props.google} 
					zoom={9}
					style={style}
					initialCenter={initialCenter}
				></Map>
				 
			);
		}
	}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBisoAT_PP5ybV9UXfIsVktOVF4jopAYgg'
})(GoogleMap);



