import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from 'react-modal';

import ParkWeather from './park_weather';
import GoogleMap from './park_map';

const NPS_API_KEY = 'B10fQSv2VLNENYG0DViy5qrHdRNSnl3vh1IQpeF1';
const NPS_PARKS_URL = '//developer.nps.gov/api/v1/parks?parkCode=';
const NPS_ALERTS_URL = '//developer.nps.gov/api/v1/alerts?parkCode=';
const NPS_CAMPGROUNDS_URL = '//developer.nps.gov/api/v1/campgrounds?parkCode=';



const ParkAPI = {
  parks: [
    { id: 1, parkCode: "acad", name: "Acadia National Park", location: "Maine", images: ['../images/acadia_1.jpg', '../images/acadia_2.jpg', '../images/acadia_3.jpg'] },
    { id: 2, parkCode: "yose", name: "Yosemite", location: "California", images: ['../images/acadia_1.jpg', '../images/acadia_2.jpg', '../images/acadia_3.jpg'] },
    { id: 3, parkCode: "yell", name: "Yellowstone National Park ", location: "Wyoming", images: ['../images/yellowstone3.jpg', '../images/yellowstone3.jpg', '../images/yellowstone4.jpg'] },
    { id: 4, parkCode: "grte", name: "Grand Teton National Park", location: "Wyoming", images: ['../images/grand_tetons1.jpg', '../images/grand_tetons_3.jpg', '../images/grand_tetons_6.jpg'] },
    { id: 5, parkCode: "grca", name: "Grand Canyon National Park", location: "Arizona", images: ['../images/grand_canyon_1.jpg', '../images/grand_canyon_2.jpg', '../images/grand_canyon_3.jpg'] },
    { id: 6, parkCode: "meve", name: "Mesa Verde National Park", location: "Colorado", images: ['../images/', '../images/', '../images/'] }
  ],
  all: function() { return this.parks},
  get: function(id) {
    const isPark = p => p.id === id
    return this.parks.find(isPark)
  }
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)', 
    width				  : '50%', 
    height 				  : '500px',
    WebkitOverflowScrolling    : 'touch', 
    overflow 			  : 'scroll'
  }
}

class ParkShow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			description: "", 
			directionsInfo: "", 
			weatherInfo: "", 
			alerts: [], 
			campgrounds: [], 
			modalIsOpen: false
			};

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
		}

	componentDidMount() {
		const park = ParkAPI.get(parseInt(this.props.match.params.id, 10));
		axios.get(`${NPS_PARKS_URL}${park.parkCode}&api_key=${NPS_API_KEY}`)
			.then(response => {
				// console.log(response);
				// console.log(response.data);
				// console.log(response.data.data);
				// console.log(response.data.data.map(obj => obj.description));
				const description = response.data.data.map(obj => obj.description);
				const directionsInfo = response.data.data.map(obj => obj.directionsInfo)
				const weatherInfo = response.data.data.map(obj => obj.weatherInfo)
				// console.log(description);
				this.setState({ description: description });
				this.setState({ directionsInfo: directionsInfo});
				this.setState({ weatherInfo: weatherInfo });
			});
		axios.get(`${NPS_ALERTS_URL}${park.parkCode}&api_key=${NPS_API_KEY}`)
			 .then(response => {
			 	// console.log(response.data.data);
			 	const alerts = response.data.data;
			 	this.setState({alerts: alerts});
			 	// console.log(this.state.alerts);
			});
		axios.get(`${NPS_CAMPGROUNDS_URL}${park.parkCode}&api_key=${NPS_API_KEY}`)
			 .then(response => {
			 	// console.log(response);
			 	// console.log(response.data.data.length);
			 	const campgrounds = response.data.data;
			 	this.setState({campgrounds: campgrounds})
			 });

	}

	openModal() {
    	this.setState({modalIsOpen: true});
  	}
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
	

	render() {
		const park = ParkAPI.get(parseInt(this.props.match.params.id, 10));

		// console.log(this.props);
  		
  		if (!park) {
  			return <div>Sorry, the park was not found</div>
  		}

  		return (
  			<div>
      			<h1>Welcome to: {park.name}</h1>
      		
      			
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
      			<div className="row">
      				<div className="col-md-6">
      					<i className='glyphicon glyphicon-plane'></i>
      					<p> {this.state.directionsInfo}</p>
      				</div>
      				<div className="col-md-6">
      					<i className='glyphicon glyphicon-cloud'></i>
      					<p>Weather: {this.state.weatherInfo}</p>
      				</div>
      			</div>
      			<div className="row">
      				<div className="col-md-6">
      					<i className='glyphicon glyphicon-plane'></i>
      					Alerts: 
      					<button onClick={this.openModal}>Click here for alerts!</button>
        				<Modal
        				  isOpen={this.state.modalIsOpen}
        				  onAfterOpen={this.afterOpenModal}
        				  onRequestClose={this.closeModal}
        				  style={customStyles}
        				  contentLabel="Example Modal"
        				>
 							<h2 ref={subtitle => this.subtitle = subtitle}>Alerts for { park.name}</h2>
        				  	<ul>{this.state.alerts.map(alert =>
      									<li key={alert.id}>{alert.title}:<p>{alert.description}</p></li>
      								)}</ul>
        				  <h6>{park.name}</h6>
        				  <button onClick={this.closeModal}>close</button>
        				</Modal>
        			</div>
        		
      			</div>

      		
      			<ParkWeather city={park.name} />
      			<div>
      				<GoogleMap city={park.name} lat={40.7831} lon={73.9712} />
      			</div>
      			      

      

      			
      			
    		</div>
		)
  	}
}

export default ParkShow;

