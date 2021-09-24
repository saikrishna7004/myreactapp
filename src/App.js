import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Notes from './components/Notes';
import SpeechToText from './components/SpeechToText';

function App() {

	return (
		<>
			<Router>
				<Navbar name="React Project" />
				<div className="">
					<Switch>
						<Route exact path="/about">
							<About />
						</Route>
						<Route exact path="/stt">
							<SpeechToText />
						</Route>
						<Route exact path="/notes">
							<Notes />
						</Route>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/">
							Not Found
						</Route>
					</Switch>
				</div>
			</Router>
		</>
	);
}

export default App;
