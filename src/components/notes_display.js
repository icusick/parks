import React, { Component } from 'react';

class NotesDisplay extends Component {
	constructor(props) {
		super(props);
	
	this._parseNotes = this._parseNotes.bind(this);

	}

	_parseNotes() {
    	let notes = [],
    	    keys = Object.keys(localStorage),
    	    i = keys.length;
	
    	while ( i-- ) {
    	    let parsedNotes = JSON.parse(localStorage.getItem(keys[i]));
    	    notes.push( parsedNotes );
    	}
	
    	// console.log(values); 
    	
    	return notes.map((note) =>  {
    	 	if(note.park === this.props.park) {
    	 		return <li className="list-group-item"><strong>{note.user}</strong><p>{note.note}</p></li>
    	 	}
    	})
    	
	}

	render() {
		const renderNotes = this._parseNotes();
		
		return(
			<div className="col-md-5">
				<ul className="list-group">
					{renderNotes}
				</ul>
			</div>
			)
	}
}

export default NotesDisplay;



