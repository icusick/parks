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

		this.state = {
			lat: 0, 
			lon: 0
		}
	}

	componentDidMount() {
		axios.get(`${ROOT_URL}&q=${this.props.city},us`)
       		 .then(response => {
        // console.log(response.data.city.coord);
        const lat = response.data.city.coord.lat;
        const lon = response.data.city.coord.lon;
        // console.log(lat, lon)
        this.setState({ lat: lat });
        this.setState({ lon: lon });
        console.log(this.state.lat, this.state.lon)
       });
	}

	render() {
		return (
			
			<Map 
				google={this.props.google} 
				zoom={9}
				style={style}
				initialCenter={{
            		lat:  this.state.lat,
            		lng:  this.state.lon
          		}}
			></Map>
			 
		);
	}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBisoAT_PP5ybV9UXfIsVktOVF4jopAYgg'
})(GoogleMap);



