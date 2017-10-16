import React, { Component } from 'react';
import axios from 'axios';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

const API_KEY = '4b7edebc57349e5aa4f637a4fe98af59';
const ROOT_URL = 'http://api.openweathermap.org/data/2.5/forecast?appid=' + API_KEY;

class ParkWeather extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			temps: []
		};
	}
	
	componentDidMount() {
		axios.get(`${ROOT_URL}&q=${this.props.city},us`)
			 .then(response => {
			 	const temps = response.data.list.map(obj => obj.main.temp);
			 	console.log(response);
			 	console.log("temps: " + temps);
			 	this.setState({ temps: temps });
			 	console.log("state: " + this.state.temps);
			 });
		
	}
	
	render() {
		

		return (
			<div>
				<h5>{this.props.city}</h5>
				<Sparklines svgWidth={210} svgHeight={120} data={this.state.temps}>
              		<SparklinesLine color="blue" />
              		<SparklinesReferenceLine type="avg" />
            	</Sparklines>
			</div>
		)
	}


}

export default ParkWeather;







