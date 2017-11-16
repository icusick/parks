import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const style = {
	width: '70%', 
	height: '150%'
}

class GoogleMap extends Component {
	constructor(props) {
		super(props);

	}

	render() {
        const initialCenter = {lat: this.props.lat, lng: this.props.lon}
     	// console.log("ic is " + initialCenter.lat);
     	if (!initialCenter.lat) {
     		return (<div><i className="fa fa-spinner fa-spin glyph"></i></div>)
     	} else {
			return (
				
				<Map 
					google={this.props.google} 
					zoom={12}
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



