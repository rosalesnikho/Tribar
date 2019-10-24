import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import App from './components/App';
import Blocks from './components/Blocks';
import ConductTransaction from "./components/ConductTransaction";
import TransactionPoolMap from "./components/TransactionPoolMap";

render(
	<Router history={history}>
		<Switch>
			<Route exact path='/' component={App} />
			<Route path='/blocks' component={Blocks} />
			<Route path='/transactions' component={ConductTransaction} />
			<Route path='/tpm' component={TransactionPoolMap} />

		</Switch>
	</Router>,
	document.getElementById('root')
);