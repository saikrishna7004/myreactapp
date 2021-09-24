import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

function Navbar(props) {
	
	let location = useLocation();

	useEffect(() => {}, [location])

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">{props.name}</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${location.pathname==="/notes"?"active":""}`} to="/notes">Notes</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${location.pathname==="/stt"?"active":""}`} to="/stt">Speech To Text</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
						</li>
					</ul>
					<form action="/" method="GET" className="d-flex">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
	);
}

Navbar.defaultProps = {
	name: "React"
}

export default Navbar;
