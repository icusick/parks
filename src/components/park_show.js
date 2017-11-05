import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Modal, Button } from 'react-bootstrap';


import ParkWeather from './park_weather';
import GoogleMap from './park_map';

const NPS_API_KEY = 'B10fQSv2VLNENYG0DViy5qrHdRNSnl3vh1IQpeF1';
const NPS_PARKS_URL = '//developer.nps.gov/api/v1/parks?parkCode=';
const NPS_ALERTS_URL = '//developer.nps.gov/api/v1/alerts?parkCode=';
const NPS_CAMPGROUNDS_URL = '//developer.nps.gov/api/v1/campgrounds?parkCode=';
const NPS_VISITORCENTER_URL = '//developer.nps.gov/api/v1/visitorcenters?parkCode=';

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

class ParkShow extends Component {
	constructor(props) {
		super(props);

    this.state = {
			description: "", 
			directionsInfo: "", 
			weatherInfo: "", 
			alerts: [], 
			campgrounds: [], 
      visitorCenters: [],
			showModal: false
		};

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
			  const campgrounds = response.data.data;
			 	this.setState({campgrounds: campgrounds});
        console.log(this.state.campgrounds[0].regulationsUrl);
			 });
    axios.get(`${NPS_VISITORCENTER_URL}${park.parkCode}&api_key=${NPS_API_KEY}`)
       .then(response => {
        console.log(response.data.data);
        const visitorCenters = response.data.data;
        this.setState({visitorCenters: visitorCenters})
       });
	}

  //react-bootstrap 
  getInitialState() {
    return { llgShow: false, lgShow: false, vcShow: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
	

	render() {
    let llgClose = () => this.setState({ llgShow: false });
    let lgClose = () => this.setState({ lgShow: false });
    let vcClose = () => this.setState({ vcShow: false });
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
      			<p className="lead well">{this.state.description}</p>
      			<div className="row text-center">
      				<div className="col-md-4 offset-md-2">
      					<i className='glyphicon glyphicon-plane'></i>
      					<p> {this.state.directionsInfo}</p>
      				</div>
      				<div className="col-md-4 offset-md-1">
      					<i className='glyphicon glyphicon-cloud'></i>
      					<p>Weather: {this.state.weatherInfo}</p>
      				</div>
      			</div>
      			<div className="row mt-5">
              <div className="col-md-4 text-center">
                <div className="glyph"><i className='glyphicon glyphicon-alert'></i></div>
                <Button bsStyle="warning" onClick={() => this.setState({ llgShow: true })}>
                  Click here for alerts
                </Button>
              </div>
              <div className="col-md-4 text-center">
                <div className="glyph"><i className='glyphicon glyphicon-tent'></i></div>
                <Button bsStyle="primary" onClick={() => this.setState({ lgShow: true })}>
                  Click here for campgrounds
                </Button>
              </div>
              <div className="col-md-4 text-center">
                <div className="glyph"><i className='glyphicon glyphicon-info-sign'></i></div>
                <Button bsStyle="info" onClick={() => this.setState({ vcShow: true })}>
                  Click here for visitor centers
                </Button>
              </div>
              <MySmallModal show={this.state.llgShow} onHide={llgClose} alerts={this.state.alerts} parkname={park.name} />
              <MyLargeModal show={this.state.lgShow} onHide={lgClose} campgrounds={this.state.campgrounds} parkname={park.name} />
              <VisitorCenterModal show={this.state.vcShow} onHide={vcClose} visitorCenters={this.state.visitorCenters} parkname={park.name} />
             
        	  </div>

      		
      			<ParkWeather city={park.name} />
      			<div>
      				<GoogleMap city={park.name}  />
      			</div>
      		</div>
		  )
  	}
}

class MySmallModal extends Component {
  render() {
    return (
      <Modal {...this.props} bsSize="lg" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Alerts for {this.props.parkname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>{this.props.alerts.map(alert =>
              <li key={alert.id}><strong>{alert.title}:</strong>:<p>{alert.description}</p></li>
          )}</ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

class MyLargeModal extends Component {
  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Campgrounds for {this.props.parkname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Total: {this.props.campgrounds.length}</h4>
          <ul>{this.props.campgrounds.map(campground =>
            <li key={campground.id}><strong>{campground.name}:</strong><p>{campground.directionsOverview}</p></li>
          )}</ul>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

class VisitorCenterModal extends Component {
  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Visitor Centers for {this.props.parkname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>{this.props.visitorCenters.map(visitorCenter =>
            <li key={visitorCenter.id}><strong>{visitorCenter.name}:</strong><p>{visitorCenter.description}</p></li>
          )}</ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      )
  }
}

export default ParkShow;

