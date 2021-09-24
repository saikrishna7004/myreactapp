import React, { useState } from 'react';

function Home(props) {

	const [text, setText] = useState('Enter Your Text Here');

	const handleOnChange = (event)=>{
		// console.log("On change");
		setText(event.target.value);
	}

	const handleUp = ()=>{
		setText(text.toUpperCase());
	}

	const handleDown = ()=>{
		setText(text.toLowerCase());
	}

	const handleExtraSpaces = ()=>{
		setText(text.replace(/\s+/g, ' ').trim());
	}

	const handleClear = ()=>{
		setText("");
	}

	const fracPart = (x)=>{
		return x-Math.floor(x)
	}

	return (
		<div className="container">
			<h1 className="my-3">Enter Text to Analyse</h1>
			<div className="mb-3">
				<textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
			</div>
			<button className="btn btn-primary m-2" disabled={text.trim().length===0} onClick={handleUp}>Convert To Uppercase</button>
			<button className="btn btn-primary m-2" disabled={text.trim().length===0} onClick={handleDown}>Convert To Lowercase</button>
			<button className="btn btn-primary m-2" disabled={text.trim().length===0} onClick={handleExtraSpaces}>Remove Extra Spaces</button>
			<button className="btn btn-primary m-2" disabled={text.trim().length===0} onClick={handleClear}>Clear</button>
			<div className="my-3">
				<h1>Preview</h1>
				<p>{text}</p>
				<p>No. of words: {text.trim().length!==0?text.replace(/\s+/g, ' ').trim().split(" ").length : 0}</p>
				<p>
					Time to read: &nbsp; 
						{Math.floor(0.01*text.replace(/\s+/g, ' ').trim().split(" ").length)} minutes &nbsp;
						{Math.floor((fracPart(0.01*text.replace(/\s+/g, ' ').trim().split(" ").length))*60)} seconds	
				</p>
			</div>
		</div>
		
	);
}
export default Home;