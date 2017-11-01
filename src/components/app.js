import React, { Component } from 'react';
import ParksIndex from './parks_index.js';
import PropTypes from 'prop-types';





class App extends Component {
	render() {
		return (
			<div>
				<h1>Hi</h1>
				<ParksIndex />

			</div>
		);
	}
}

App.propTypes = {
  propArray: PropTypes.array.isRequired, 
 propBool: PropTypes.bool.isRequired,
 propFunc: PropTypes.func,
 propNumber: PropTypes.number,
 propString: PropTypes.string,
 propObject: PropTypes.object
}


export default App;