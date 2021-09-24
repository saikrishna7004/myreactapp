const Card = (props)=>{

    return (
        <div className="col-md-3 m-2 card" style={props.imp?{backgroundColor: "red", color: "white"}:{}}>
            <div className="card-body">
            <h5 className="card-title title">{props.title}</h5>
            <p className="card-text text">{props.text}</p>
            <button id={props.id} className="btn p-0 shadow-none mx-2" onClick={()=>{props.delete(props.id)}} aria-label="Delete">
                <i className="fa fa-trash" alt="Delete" style={props.imp?{fontSize: "24px", color: "white"}:{fontSize: "24px"}}></i>
            </button>
            <button id={props.id} className="btn p-0 shadow-none mx-2" onClick={()=>{props.update(props.id)}} aria-label="Edit" data-bs-toggle="modal" data-bs-target="#editModal">
                <i className="fa fa-edit" alt="Edit" style={props.imp?{fontSize: "24px", color: "white"}:{fontSize: "24px"}}></i>
            </button>
            </div>
        </div>
    );
}

export default Card;