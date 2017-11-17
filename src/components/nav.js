import React, { Component } from 'react';
import { ParkAPI } from './parks_index';
import { Link } from 'react-router-dom';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class Nav extends Component {
	render() {
		return (
		<nav className="navbar navbar-light bg-faded">
		        <a className="navbar-brand" href="/">
		          <img className="d-inline-block align-top" src="../images/mountain_4.png" width="40" height="40" alt=""></img>
		        </a>	
		        <h2 className="offset-md-1">ParkDash</h2>	
		        <DropdownButton bsStyle="default" title="Pick a park" key="1" id={`dropdown-basic-{1}`}>
		        {
            ParkAPI.all().map(p => (
              <MenuItem><Link to={`/parks/${p.id}`}><p>{p.name}</p></Link></MenuItem>
              ))
            }       </DropdownButton>
      	</nav>		
	)}	

}

export default Nav;

