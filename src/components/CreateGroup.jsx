import React from "react";

export default function CreateGroup(props) {

    const [buttonTitle, setButtonTitle] = React.useState("No image chosen")
    const [newGroupName, setNewGroupName] = React.useState("")
    const [newGroupIcon, setNewGroupIcon] = React.useState("")
    
    function uploadFiles() {
        let realUpload = document.getElementById("img-file")
        
        realUpload.click()
    }

    function imageUploaded() {

        let realUpload = document.getElementById("img-file")
        let img
        
        let reader = new FileReader()
        reader.readAsDataURL(realUpload.files[0])

        reader.onload = function (oFREvent) {
            setButtonTitle(realUpload.files[0].name)
            img = oFREvent.target.result
            setNewGroupIcon(img)
        }
        
        
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        if (newGroupIcon && newGroupName ) {
            props.handleSubmit({type: "add-group", payload: {name: newGroupName, icon: newGroupIcon}})
            setNewGroupIcon("")
            setNewGroupName("")
            props.handleCloseWindow()
        }
    }

    return (
        <div className="back-shadow">
            <div className="group-pop">
                <div className="popup-header">
                    <div className="popup-group-title">Create Group</div>
                    <p onClick={props.handleCloseWindow} className="x-btn">X</p>
                </div>
                <form className="group-field" onSubmit={(e) => handleSubmit(e)}>
                    <div className="groupName-enter">
                        <p>Group name:</p>
                        <div className="name-form">
                            <input className="input" value={newGroupName} onChange={e => setNewGroupName(e.target.value)}/>
                        </div>
                        
                    </div>
                    <div className="groupImg-enter">
                        <p>Group icon:</p>
                        <div className="img-upload">
                            <input className="file-upload" type="file" id="img-file" style={{display: "none"}} accept="image/png, image/jpg, img/jpeg" onChange={imageUploaded}/>
                            <div className="upload-img-container">
                                <button id="img-upload" onClick={uploadFiles}>Choose image</button>
                                <p>{buttonTitle}</p>
                            </div>
                        </div>
                    </div>
                    <button className="submit-group" type="submit">Submit</button>
                    {/* <img id="img-test" className="img-test" src={""}/> */}
                </form>
            </div>
        </div>
    )
}