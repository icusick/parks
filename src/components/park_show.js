import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import ParkWeather from './park_weather';
import GoogleMap from './park_map';

const NPS_API_KEY = 'B10fQSv2VLNENYG0DViy5qrHdRNSnl3vh1IQpeF1';
const NPS_ROOT_URL = '//developer.nps.gov/api/v1/parks?parkCode=';

const ParkAPI = {
  parks: [
    { id: 1, parkCode: "acad", name: "Acadia National Park", location: "Maine", images: ['../images/acadia_1.jpg', '../images/acadia_2.jpg', '../images/acadia_3.jpg'] },
    { id: 2, parkCode: "yose", name: "Yosemite", location: "California", images: ['../images/acadia_1.jpg', '../images/acadia_2.jpg', '../images/acadia_3.jpg'] },
    { id: 3, parkCode: "yell", name: "Yellowstone National Park ", location: "Wyoming", images: ['../images/yellowstone3.jpg', '../images/yellowstone3.jpg', '../images/yellowstone4.jpg'] },
    { id: 4, parkCode: "acad", name: "Grand Teton National Park", location: "Wyoming", images: ['../images/grand_tetons1.jpg', '../images/grand_tetons_3.jpg', '../images/grand_tetons_6.jpg'] },
    { id: 5, parkCode: "acad", name: "Grand Canyon National Park", location: "Arizona", images: ['../images/grand_canyon_1.jpg', '../images/grand_canyon_2.jpg', '../images/grand_canyon_3.jpg'] },
    { id: 6, parkCode: "acad", name: "Mesa Verde National Park", location: "Colorado", images: ['../images/', '../images/', '../images/'] }
  ],
  all: function() { return this.parks},
  get: function(id) {
    const isPark = p => p.id === id
    return this.parks.find(isPark)
  }
}

class ParkShow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			description: ""
		};
	}

	componentDidMount() {
		axios.get(`${NPS_ROOT_URL}yell&api_key=${NPS_API_KEY}`)
			.then(response => {
				console.log(response);
				console.log(response.data);
				console.log(response.data.data);
				console.log(response.data.data.map(obj => obj.description));
				const description = response.data.data.map(obj => obj.description);
				// console.log(description);
				this.setState({ description: description });
			});
	}

	render() {
		const park = ParkAPI.get(parseInt(this.props.match.params.id, 10));

		// console.log(this.props);
  		
  		if (!park) {
  			return <div>Sorry, the park was not found</div>
  		}

  		return (
  			<div>
      			<h1>Park: {park.name}</h1>
      			<h2>State: {park.location}</h2>
      			
      			<Link to='/parks'>Back</Link>
      			<div className="my-carousel">
      			<Carousel showArrows={true} axis="horizontal" infiniteLoop autoPlay dynamicHeight={true} showThumbs={false}>
      					<div>
      						<img src={park.images[0]} />
      					</div>
      					<div>
      						<img src={park.images[1]} />
      					</div>
      					<div>
							<img src={park.images[2]} />
      					</div>
      			</Carousel>
      			</div>
      			<p>{this.state.description}</p>
      			<ParkWeather city={park.name} />
      			
    		</div>
		)
  	}
}

export default ParkShow;

