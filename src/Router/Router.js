import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../components/Home/home";
import Login from "../components/Login/login";


class Routers extends Component {
    
	render() {

		return (
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/home" component={Home} />
			</Switch>
		);
	}
}

export default Routers;