import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

const ParkAPI = {
  parks: [
    { id: 1, name: "Acadia National Park", location: "Maine", images: ['../images/acadia_1.jpg', '../images/acadia_2.jpg', '../images/acadia_3.jpg'] },
    { id: 2, name: "Yosemite", location: "California", images: ['../images/acadia_1.jpg', '../images/acadia_2.jpg', '../images/acadia_3.jpg'] },
    { id: 3, name: "Yellowstone National Park ", location: "Wyoming", images: ['../images/yellowstone3.jpg', '../images/yellowstone3.jpg', '../images/yellowstone4.jpg'] },
    { id: 4, name: "Grand Teton National Park", location: "Wyoming", images: ['../images/grand_tetons1.jpg', '../images/grand_tetons_3.jpg', '../images/grand_tetons_6.jpg'] },
    { id: 5, name: "Grand Canyon National Park", location: "Arizona", images: ['../images/grand_canyon_1.jpg', '../images/grand_canyon_2.jpg', '../images/grand_canyon_3.jpg'] },
    { id: 6, name: "Mesa Verde National Park", location: "Colorado", images: ['../images/', '../images/', '../images/'] }
  ],
  all: function() { return this.parks},
  get: function(id) {
    const isPark = p => p.id === id
    return this.parks.find(isPark)
  }
}



class ParkShow extends Component {
	render() {
		const park = ParkAPI.get(parseInt(this.props.match.params.id, 10));

		console.log(this.props);
  		
  		if (!park) {
  			return <div>Sorry, the park was not found</div>
  		}

  		return (
  			<div>
      			<h1>Park: {park.name}</h1>
      			<h2>State: {park.location}</h2>
      			
      			<Link to='/parks'>Back</Link>
      			<Carousel showArrows={true} axis="horizontal" infiniteLoop autoPlay>
      					<img src={park.images[0]} />
      					<p className="legend">Legend 1</p>
      					<img src={park.images[1]} />
      					<p className="legend">Legend 2</p>
						<img src={park.images[2]} />
      					<p className="legend">Legend 3</p>
      				
      			</Carousel>
    		</div>
		)
  	}
}

export default ParkShow;

