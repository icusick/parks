import React, { Component } from 'react';
import { ParkAPI } from './parks_index';
import { Link } from 'react-router-dom';
import { DropdownButton, MenuItem, Navbar, Nav, NavDropdown } from 'react-bootstrap';

class NavBar extends Component {
	render() {
		return (
			<Navbar>
			<Navbar.Brand>
        		<a href="/">ParkDash</a>
      		</Navbar.Brand>	
      		<Nav>        		
        		<NavDropdown title="Pick a Park" id="basic-nav-dropdown">
        		  {
            		ParkAPI.all().map(p => (
            		  <MenuItem><Link to={`/parks/${p.id}`}><p>{p.name}</p></Link></MenuItem>
            		  ))
            		}  
        		</NavDropdown>
      		</Nav>
			</Navbar>		
	)}	

}
	
export default NavBar;

