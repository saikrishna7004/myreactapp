import React from 'react'

function Alert(props) {
    return (
            props.alert && <div className={`alert alert-${props.alert.type} fade show`} style={{position: "sticky", top: 0}} role="alert">
                <strong>{props.alert.strong}</strong> {props.alert.message}
            </div>
    )
}

export default Alert
