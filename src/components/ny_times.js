import React, { Component } from 'react';
import axios from 'axios';
import '../index.css';

const NYTIMES_API_KEY = '37ba2670588b4dddbd94eca5e6b40801';
const NYTIME_ROOT_URL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=';

class NYTimes extends Component {
	constructor(props) {
		super(props); 

		this.state = {
			articles: []
		}
	}

	componentDidMount() {
		axios.get(`${NYTIME_ROOT_URL}${this.props.city}&api-key=${NYTIMES_API_KEY}`)
			 .then(response => {
			 	// console.log(response.data.response.docs);
			 	const articles = response.data.response.docs;
			 	this.setState({ articles: articles});
			 	// console.log(this.state.articles);
			 })
	}

	render() {
		return (
			<div className="col-md-7 offset-md-4">
			<h3 className ="ny-times">New York Times</h3>
			<ul className="list-group scrollify">{this.state.articles.map(article =>
				<a href={article.web_url} target="_blank" className="list-group-item" key={article.id}><strong>{article.headline.main}</strong><p>{article.snippet}</p></a>
				)}
			</ul>
			</div>
		)
	}
}


export default NYTimes;