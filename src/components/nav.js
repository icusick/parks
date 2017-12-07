import React, { Component } from 'react';
import { ParkAPI } from './parks_index';
import { Link } from 'react-router-dom';
import { DropdownButton, MenuItem, Navbar, Nav, NavDropdown } from 'react-bootstrap';

class NavBar extends Component {
	render() {
		return (
			<Navbar className="nav-flex nav-custom">
			<Navbar.Brand className="nb-brand">
				<a href="/"><img className="d-inline-block align-top" src="../images/mountain_1.jpg" width="60" height="80" alt=""></img>ParkDash</a> 
        		
      		</Navbar.Brand>	
      		<Nav>        		
        		<NavDropdown title="Pick a Park" id="basic-nav-dropdown" noCaret>
        			<div className="dropdown-overflow">
        			  	{
            			  ParkAPI.all().map(p => (
            			    <MenuItem componentClass="span"><Link to={`/parks/${p.id}`}><p>{p.name}</p></Link></MenuItem>
            			    ))
            			  }  
            		</div>
        		</NavDropdown>
      		</Nav>
			</Navbar>		
	)}	

}
	
export default NavBar;

