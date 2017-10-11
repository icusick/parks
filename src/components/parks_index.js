import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ParkAPI = {
  parks: [
    { id: 1, name: "Acadia National Park", location: "Maine" },
    { id: 2, name: "Yosemite", location: "California" },
    { id: 3, name: "Yellowstone National Park ", location: "Wyoming" },
    { id: 4, name: "Grand Teton National Park", location: "Wyoming" },
    { id: 5, name: "Grand Canyon National Park", location: "Arizona" },
    { id: 6, name: "Mesa Verde National Park", location: "Colorado" }
  ],
  all: function() { return this.parks},
  get: function(id) {
    const isPark = p => p.id === id
    return this.parks.find(isPark)
  }
}

class ParksIndex extends Component {
  render() {
    return (
      <div>
        <ul>
            {
            ParkAPI.all().map(p => (
             <li key={p.id}>
                <Link to={`/parks/${p.id}`}>{p.name}</Link>
              </li>
            ))
          }
       </ul>
    </div>
    )
  }
}

export default ParksIndex;

