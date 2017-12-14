import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';

// import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

// const API_KEY = '4b7edebc57349e5aa4f637a4fe98af59';
// const ROOT_URL = 'http://api.openweathermap.org/data/2.5/forecast?appid=' + API_KEY;
const WUNDERGROUNG_URL = '//api.wunderground.com/api/b5806acb9436670f/conditions/q/';
const NPS_API_KEY = 'B10fQSv2VLNENYG0DViy5qrHdRNSnl3vh1IQpeF1';
const NPS_PARKS_URL = '//developer.nps.gov/api/v1/parks?parkCode=';


class ParkWeather extends Component {
	constructor(props) {
		super(props);

		this.state = {
			latt: null, 
			lonn: null, 
			feelslike: "", 
			temp: 0, 
			icon: ""
		};
	}


	componentWillReceiveProps(nextProps) {
		axios.get(`${WUNDERGROUNG_URL}${nextProps.lat},${nextProps.lon}.json`)
    // 		"http://api.wunderground.com/api/b5806acb9436670f/conditions/q/44.30777545,-68.30063316.json"
       		.then(response => {
       		 // console.log(response.data.current_observation);
       		 // console.log("current temp: " + response.data.current_observation.feelslike_string);
       		 const feelslike = response.data.current_observation.feelslike_string;
       		 this.setState({ feelslike: feelslike })
       		 // console.log("feels like: " + response.data.current_observation.temp_f);
       		 const temp = response.data.current_observation.temp_f;
       		 this.setState({ temp: temp });
       		 const icon = response.data.current_observation.icon_url;
       		 this.setState({ icon: icon });
       		 const forecastUrl = response.data.current_observation.forecast_url;
       		 this.setState({ forecast_url: forecastUrl});
       		 const weather = response.data.current_observation.weather;
       		 this.setState({ weather: weather })
       		 // console.log(this.state.icon);
       		})
       		.catch(function (error) {
    				// console.log(error);
  	   		});
		
  	   	
	}
	
	render() {
		// 	PUT ALL THIS IN PARK_SHOW TO MAYBE AVOID THIS WEIRD MULTIPLE REQUESTS THING
		return (
			<div>
				<p className="current-temp">{this.state.temp}<img src={this.state.icon}/></p>
				<p>{this.state.weather}</p>
				<p>Feels Like: {this.state.feelslike}</p>
				<a href={this.state.forecast_url} target="_blank">View 10 day forecast</a>
			</div>
			)
		
	}


}

export default ParkWeather;







