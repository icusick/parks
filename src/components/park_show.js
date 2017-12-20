import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Modal, Button } from 'react-bootstrap';
import update from 'immutability-helper';

import '../index.css';

import ParkWeather from './park_weather';
import GoogleMap from './park_map';
import NYTimes from './ny_times';
import { ParkAPI } from './parks_index';
import NavBar from './nav';
import NoteForm from './notepad_form';
import NotesDisplay from './notes_display';

const NPS_API_KEY = 'B10fQSv2VLNENYG0DViy5qrHdRNSnl3vh1IQpeF1';

const NPS_PARKS_URL = '//developer.nps.gov/api/v1/parks?parkCode=';
const NPS_ALERTS_URL = '//developer.nps.gov/api/v1/alerts?parkCode=';
const NPS_CAMPGROUNDS_URL = '//developer.nps.gov/api/v1/campgrounds?parkCode=';
const NPS_VISITORCENTER_URL = '//developer.nps.gov/api/v1/visitorcenters?parkCode=';

const WUNDERGROUNG_URL = '//api.wunderground.com/api/b5806acb9436670f/conditions/q/';

class ParkShow extends Component {
	constructor(props) {
		super(props);

    this.state = {
			description: "", 
			directionsInfo: "", 
			weatherInfo: [], 
			alerts: [], 
			campgrounds: [], 
      visitorCenters: [],
			showModal: false, 
      lat: 0, 
      lon: 0,
      feelslike: "", 
      temp: 0, 
      icon: ""
		};

	}

	componentDidMount() {
		const park = ParkAPI.get(parseInt(this.props.match.params.id, 10));
		axios.get(`${NPS_PARKS_URL}${park.parkCode}&api_key=${NPS_API_KEY}`)
			.then(response => {
				// console.log(response.data.data);
				const description = response.data.data.map(obj => obj.description);
				const directionsInfo = response.data.data.map(obj => obj.directionsInfo);
				const weatherInfo = response.data.data.map(obj => obj.weatherInfo);
        let updatedWeather = update(this.state.weatherInfo, {$push: [weatherInfo]});
        const latLon = response.data.data.map(obj => obj.latLong);
        const stringify = latLon.toString();        
        const regEx = stringify.match(/lat:(.*), long:(.*)/);
        const lat = regEx[1];
        const lon = regEx[2];
        this.setState({ lat: lat, lon: lon})
				this.setState({ weatherInfo: updatedWeather, directionsInfo: directionsInfo, description: description });
			});
		axios.get(`${NPS_ALERTS_URL}${park.parkCode}&api_key=${NPS_API_KEY}`)
			 .then(response => {
			
			 	const alerts = response.data.data;
			 	this.setState({ alerts: alerts});
	
			});
		axios.get(`${NPS_CAMPGROUNDS_URL}${park.parkCode}&api_key=${NPS_API_KEY}`)
			 .then(response => {
			 	
			  const campgrounds = response.data.data;
   
        this.setState({ campgrounds: campgrounds })
			 });
    axios.get(`${NPS_VISITORCENTER_URL}${park.parkCode}&api_key=${NPS_API_KEY}`)
       .then(response => {
        
        const visitorCenters = response.data.data;
        let updatedVC = this.state.visitorCenters.concat(response.data.data);
        this.setState({ visitorCenters: updatedVC});
       });


	}


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

  		if (!park && !this.state.lat) {
  			return <div>Sorry, the park was not found</div>
  		}

  		return (
        <div>
        <NavBar/>
  			<div className="container">
      			<h1>Welcome to {park.name} National Park</h1>      	      			
      			<div>
      			  <Carousel showArrows={true} axis="horizontal" infiniteLoop={true} autoPlay={true} dynamicHeight={true} showThumbs={false} interval={3000}>
      			  		
                    {park.images.map(img => 
                      <img className="pic" src={img} />
                    )}
      			  		
      			  </Carousel>
      			</div>
      			<p className="lead well">{this.state.description}</p>
      			<div className="row text-center glyph">
      				<div className="col-md-4 offset-md-1">
      					<i className='glyphicon glyphicon-plane'></i>
      					<p> {this.state.directionsInfo}</p>
      				</div>
      				<div className="col-md-4 offset-md-1">
      					<i className='glyphicon glyphicon-cloud'></i>
      					<p>{this.state.weatherInfo}</p>
      				</div>
      			</div>
      			<div className="row mt-5">
              <div className="col-md-4 text-center offset-md-1">
                <div className="glyph"><i className='glyphicon glyphicon-alert buttons'></i></div>
                <Button bsStyle="warning" onClick={() => this.setState({ llgShow: true })}>
                  Click here for alerts
                </Button>
                <div className="glyph"><i className='glyphicon glyphicon-tent buttons'></i></div>
                <Button bsStyle="primary" onClick={() => this.setState({ lgShow: true })}>
                  Click here for campgrounds
                </Button>
                <div className="glyph"><i className='glyphicon glyphicon-info-sign buttons'></i></div>
                <Button bsStyle="info" onClick={() => this.setState({ vcShow: true })}>
                  Click here for visitor centers
                </Button>
                <MySmallModal show={this.state.llgShow} onHide={llgClose} alerts={this.state.alerts} parkname={park.name} />
              <MyLargeModal show={this.state.lgShow} onHide={lgClose} campgrounds={this.state.campgrounds} parkname={park.name} />
              <VisitorCenterModal show={this.state.vcShow} onHide={vcClose} visitorCenters={this.state.visitorCenters} parkname={park.name} />
              </div>
              <div className="col-md-6 offset-md-1">
                <GoogleMap city={park.name} lat={this.state.lat} lon={this.state.lon} />
              </div>
            </div>
            <div className="row third-row">
      			  <div className="col-md-5">
                <NYTimes city={park.name} />
              </div>
              <div className="col-md-4 offset-md-2 weather">
                <ParkWeather city={park.name} lat={this.state.lat} lon={this.state.lon} parkcode={park.parkCode}/>
              </div> 
            </div>
            <div>
              <h1>Notepad</h1>
            </div>
            <div className="row container">              
              <NoteForm park={park.name} />
              <NotesDisplay park={park.name} />
            </div>
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
    if (this.props.visitorCenters.length === 0) {
      return (<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Visitor Centers for {this.props.parkname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <div>There is no information about visitor centers at {this.props.parkname} at this time.</div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>)
    } else {
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
}

export default ParkShow;

