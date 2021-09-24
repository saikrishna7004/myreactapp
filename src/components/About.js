import React, { useState } from 'react'

function About(props) {
    // Using useState for storing New Notes
    const [num, setNum] = useState(null)

    const handleOnChangeNo = (event) => {
        setNum(event.target.value);
    }

    return (
        <div className="container">
            Hello About Page
            <div className="my-3">
                <label className="form-label" htmlFor="no">Phone Number</label>
                <input className="form-control" type="phone" name="no" id="no" onChange={handleOnChangeNo} />
           </div>
            <a className="btn btn-success" href={"whatsapp://send/?phone="+num}>WhatsApp</a>
        </div>
    );
}
export default About;