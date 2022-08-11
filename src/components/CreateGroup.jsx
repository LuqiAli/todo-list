import React from "react";

export default function CreateGroup(props) {

    const [buttonTitle, setButtonTitle] = React.useState("Choose Image")
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
    
    function handleSubmit() {
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
                <div className="group-field">
                    <div className="groupName-enter">
                        <p>Group name:</p>
                        <form className="name-form" onSubmit={e => {
                                e.preventDefault()
                            }}>
                            <input className="input" value={newGroupName} onChange={e => setNewGroupName(e.target.value)}/>
                        </form>
                        
                    </div>
                    <div className="groupImg-enter">
                        <p>Group icon:</p>
                        <form className="img-upload" onSubmit={e => {
                                e.preventDefault()
                            }}>
                            <input className="file-upload" type="file" id="img-file" style={{display: "none"}} accept="image/png, image/jpg, img/jpeg" onChange={imageUploaded}/>
                            <button id="imgBtn" onClick={uploadFiles}>{buttonTitle}</button>
                            {/* <p>{buttonTitle}</p> */}
                        </form>
                    </div>
                    <button className="submit-group" onClick={handleSubmit}>Submit</button>
                    {/* <img id="img-test" className="img-test" src={""}/> */}
                </div>
            </div>
        </div>
    )
}