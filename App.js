import React from 'react';
import AdminTable from './src/components/AdminTable';
import CreateTable from './src/containers/CreateTable';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
	<Router>
		<div>
			<Route exact path="/" component={AdminTable} />
			<Route path="/create" component={CreateTable} />
			<Route path="/users/:id/" component={CreateTable} />
		</div>
	</Router>
);

export default App;