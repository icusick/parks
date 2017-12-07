import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';

import App from './components/app.js';
import ParkShow from './components/park_show.js';


ReactDOM.render(
		<BrowserRouter>
			<div>
			<ScrollToTop />
				<Switch>
					
					<Route path="/parks/:id" component={ParkShow} />
					<Route path="/" component={App} />
				</Switch>
			</div>
		</BrowserRouter>, document.getElementById('root'));



