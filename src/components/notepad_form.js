import React, { Component } from 'react';
import {Form, FormGroup, FormControl, ControlLabel, Col, Button} from 'react-bootstrap';

class NoteForm extends Component {
	constructor(props){
		super(props);

		this.state = {
			user: '', 
			note: ''
		}

		this._submitResponse = this._submitResponse.bind(this);
		this._clearForm = this._clearForm.bind(this);
		this._handleUserSubmission = this._handleUserSubmission.bind(this);
		this._handleNoteSubmission = this._handleNoteSubmission.bind(this);
	}

	_clearForm() {
		this.setState({user: ''});
		this.setState({note: ''})
	}

	// prevent page reload and store input values to an object
	_submitResponse(e) {
		e.preventDefault();
	
		// both inputs need values
		if(this.state.user && this.state.note) {
			let noteResponse = {
				user: this.state.user,
				note: this.state.note
			}

			console.log(noteResponse);
			
			// turn response object into a string for local storage
			noteResponse = JSON.stringify(noteResponse);

      		// stores item using localStorage. Response is in JSON format.
      		localStorage.setItem(localStorage.length, noteResponse);
			// clear input fields and set state to empty strings again
			this._clearForm();

		} else {
			alert("Both input fields need to be filled in order for us to record your notes.");
		}
	}

	_handleUserSubmission(e) {
		this.setState({user: e.target.value})
	}

	_handleNoteSubmission(e) {
		this.setState({note: e.target.value})
	}

	render() {
		return (
		<Form horizontal className='well col-md-5'>
        <FormGroup >
          <Col className="col-md-2">
            Name: 
          </Col>
          <Col className="col-md-5">
            <FormControl componentClass='textarea' value={this.state.user} onSubmit={this._handleUserSubmission} placeholder='Your name goes here'/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col className="col-md-2">
            Note:
          </Col>
          <Col className='col-md-8'>
            <FormControl componentClass='textarea' value={this.state.note} onSubmit={this._handleNoteSubmission} placeholder='What can you tell us about your experience at this park?'/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col className="col-md-3 offset-md-2">
            <Button onSubmit={this._submitResponse} type='submit'>
              Submit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
			
	}
}

export default NoteForm;