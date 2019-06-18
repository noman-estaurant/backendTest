import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import Welcome from './Welcome/Welcome'
import Login from './Login/Login'
import Main from './Main/Main'

ReactDOM.render(
	<HashRouter>
		<div>
			<Route exact path='/' component={Welcome} />
			<Route path='/login' component={Login} />
			<Route path='/main' component={Main} />
		</div>
	</HashRouter>,
	document.getElementById('root')
)

window.fbAsyncInit = function() {
	FB.init({
		appId: '311979432807070',
		cookie: true,
		xfbml: true,
		version: 'v3.2'
	})

	// Now that we've initialized the JavaScript SDK, we call
	// FB.getLoginStatus().  This function gets the state of the
	// person visiting this page and can return one of three states to
	// the callback you provide.  They can be:
	//
	// 1. Logged into your app ('connected')
	// 2. Logged into Facebook, but not your app ('not_authorized')
	// 3. Not logged into Facebook and can't tell if they are logged into
	//    your app or not.
	//
	// These three cases are handled in the callback function.
}
