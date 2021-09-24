import React, { useState, useEffect, useRef } from 'react'
import Alert from './Alert'
import Card from './Card'

function Notes() {

    // Getting Notes from the Local Storage
    var notes = localStorage.getItem("notes")

    // Using useState for storing notes and returning notes using useEffect hook
    const [notesObj, setNotesObj] = useState([])
    useEffect(() => {
        setNotesObj(notes === null ? [] : JSON.parse(notes))
    }, [notes])

    const refClose = useRef(null)
    const refClose1 = useRef(null)
    const refClose2 = useRef(null)
    const refFile = useRef(null)

    // Using useState for storing New Notes
    const [newNote, setNewNote] = useState({ title: "", text: "", imp: false })

    // Using useState for storing Update Notes
    const [updatedNote, setUpdatedNote] = useState({ index: 0, etitle: "", etext: "", eimp: false })

    // Using useState for storing Uploaded file state
    const [jsonValid, setJsonValid] = useState(false)
    const [uploadedObj, setUploadedObj] = useState([])

    // Using useState for alert 
    const [alert, setAlert] = useState(null)

    const showAlert = (newAlert) => {
        setAlert(newAlert);
        setTimeout(() => {
            setAlert(null)
        }, 5000);
    }

    // Function to Delete a note
    function deleteNote(index) {
        notes = localStorage.getItem("notes");
        let tempObj = notesObj;
        tempObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(tempObj));
        setNotesObj(tempObj);
        notes = localStorage.getItem("notes");
        setNotesObj(notes === null ? [] : JSON.parse(notes));
        showAlert({ type: "success", strong: "Success! ", message: "Notes Deleted Successfully" });
    }

    // Function to Download Data
    function downloadData() {
        let notes = localStorage.getItem("notes")
        var tempDownData = "data:json;charset=utf-8," + encodeURIComponent(notes)
        let downData = document.createElement("a")
        downData.href = tempDownData
        downData.download = "notes.json"
        downData.click()
        downData.remove()
    }

    // Function to Edit Note
    function editNote() {
        notes = localStorage.getItem("notes");
        let tempObj = notesObj;
        tempObj[updatedNote.index] = { title: updatedNote.etitle, text: updatedNote.etext, imp: updatedNote.eimp };
        localStorage.setItem("notes", JSON.stringify(tempObj));
        setNotesObj(tempObj);
        notes = localStorage.getItem("notes");
        setNotesObj(notes === null ? [] : JSON.parse(notes));
        refClose1.current.click();
        showAlert({ type: "success", strong: "Success! ", message: "Notes Updated Successfully" });
    }

    // Function to get the index of current updatable note
    function sendUpdate(index) {
        setUpdatedNote({ index: index, etitle: notesObj[index].title, etext: notesObj[index].text, eimp: notesObj[index].imp })
    }

    // Function to Upload Notes from json
    function uploadNotes() {
        let tempObj = notesObj;
        let tempObj2 = JSON.parse(uploadedObj);
        for (let i = 0; i < tempObj2.length; i++) {
            tempObj.push(tempObj2[i]);
        }
        localStorage.setItem("notes", JSON.stringify(tempObj));
        setNotesObj(tempObj)
        notes = localStorage.getItem("notes");
        setNotesObj(notes === null ? [] : JSON.parse(notes));
        setUploadedObj([])
        refClose2.current.click()
        refFile.current.value = ""
    }

    // Functions to handle uploads
    function handleUploadChange(event) {
        if (event.target.files.length !== 0) {
            var reader = new FileReader();
            reader.onload = onReaderLoad;
            reader.readAsText(event.target.files[0]);
        }
    }

    function onReaderLoad(event) {
        let obj = ""
        try {
            obj = JSON.parse(event.target.result);
            setUploadedObj(JSON.stringify(obj, undefined, 4))
            setJsonValid(true)
        } catch (error) {
            obj = error.message + `. Please Upload File in valid JSON Format.`;
            setUploadedObj(obj)
            setJsonValid(false)
        }
    }

    function UploadBtn(props) {
        if (props.valid) { return <button className="btn btn-success" type="button" style={{ borderRadius: 0 }} onClick={uploadNotes}>Upload Notes</button> }
        return null
    }

    // Function to add new notes
    function submitNotes() {
        notes = localStorage.getItem("notes");
        let tempObj = notesObj;
        tempObj.push(newNote);
        localStorage.setItem("notes", JSON.stringify(tempObj));
        setNotesObj(tempObj);
        notes = localStorage.getItem("notes");
        setNotesObj(notes === null ? [] : JSON.parse(notes));
        showAlert({ type: "success", strong: "Success! ", message: "Notes Added Successfully" });
        refClose.current.click();
        setNewNote({ ...newNote, title: "", text: "", imp: false });
    }

    // Functions to handle different types of inputs
    const handleOnChange = (event) => {
        setNewNote({ ...newNote, [event.target.name]: event.target.value });
    }

    const handleOnChangeCheck = (event) => {
        setNewNote({ ...newNote, [event.target.name]: event.target.checked });
    }

    const handleOnChangeUpdate = (event) => {
        setUpdatedNote({ ...updatedNote, [event.target.name]: event.target.value });
    }

    const handleOnChangeCheckUpdate = (event) => {
        setUpdatedNote({ ...updatedNote, [event.target.name]: event.target.checked });
    }

    return (
        <>

            <Alert alert={alert} />

            <div className="container my-3">

                <h2>This is my Notes App</h2>

                {/* Buttons */}
                <div className="container">
                    <button type="button" className="btn btn-primary mx-2 my-2" style={{ borderRadius: 0 }} data-bs-toggle="modal" data-bs-target="#addModal">Add Note</button>
                    <button type="button" className="btn btn-primary mx-2 my-2" style={{ borderRadius: 0 }} data-bs-toggle="modal" data-bs-target="#uploadModal">Upload Notes</button>
                    <button type="button" className="btn btn-primary mx-2 my-2" style={{ borderRadius: 0 }} onClick={downloadData}>Download Notes</button>
                </div>

                {/* Notes */}
                <div className="container py-3">
                    <h3>Your Notes</h3>
                    <hr />
                    <div className="row container my-4 justify-content-around" style={{ maxHeight: "500px", overflowY: "auto", overflowX: "hidden" }}>
                        {notesObj.length === 0 ? "No Notes to Display" : notesObj.map((e, i) => <Card imp={e.imp} title={e.title} text={e.text} id={i} delete={deleteNote} update={sendUpdate} key={i} />)}
                    </div>
                </div>

                {/* Add Note */}
                <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="addTitle" className="form-label">Title</label>
                                    <input type="text" name="title" className="form-control" value={newNote.title} onChange={handleOnChange} id="addTitle" placeholder="Enter the Title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="addTxt" className="form-label">Notes</label>
                                    <textarea className="form-control" name="text" id="addTxt" value={newNote.text} onChange={handleOnChange} rows="3" placeholder="Enter the notes"></textarea>
                                </div>
                                <div className="mb-3">
                                    <input type="checkbox" name="imp" id="addImp" onChange={handleOnChangeCheck} checked={newNote.imp} style={{ cursor: "pointer" }} />
                                    <label className="form-label" htmlFor="addImp" style={{ cursor: "pointer" }}>&nbsp;Mark as Important</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" style={{ borderRadius: 0 }} ref={refClose} data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" style={{ borderRadius: 0 }} onClick={submitNotes}>Add Notes</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit */}
                <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="eaddTitle" className="form-label">Title</label>
                                    <input type="text" name="etitle" className="form-control" onChange={handleOnChangeUpdate} value={updatedNote.etitle} id="eaddTitle" placeholder="Enter the Title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eaddTxt" className="form-label">Notes</label>
                                    <textarea className="form-control" name="etext" id="eaddTxt" onChange={handleOnChangeUpdate} value={updatedNote.etext} rows="3" placeholder="Enter the notes"></textarea>
                                </div>
                                <div className="mb-3">
                                    <input type="checkbox" name="eimp" id="eaddImp" onChange={handleOnChangeCheckUpdate} style={{ cursor: "pointer" }} checked={updatedNote.eimp} />
                                    <label className="form-label" htmlFor="eaddImp" style={{ cursor: "pointer" }}>&nbsp;Mark as Important</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" style={{ borderRadius: 0 }} ref={refClose1} data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" style={{ borderRadius: 0 }} onClick={editNote}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload */}
                <div className="modal fade" id="uploadModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Upload Your Notes</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <p>Upload previously formatted JSON only.</p>
                                    <div className="input-group">
                                        <input type="file" className="form-control" id="inpFile" ref={refFile} onChange={handleUploadChange} />
                                    </div>
                                </div>

                                <div className="container my-3" style={{ display: uploadedObj.length === 0 ? "none" : "block" }}>
                                    <h2>Preview</h2>
                                    <pre className="container" id="jsonBtn" style={{ color: "green", fontWeight: "bold", height: "200px", overflowY: "auto" }}>{uploadedObj}</pre>
                                    <div id="updateDiv"><UploadBtn valid={jsonValid} /></div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" style={{ borderRadius: 0 }} ref={refClose2} data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Notes;