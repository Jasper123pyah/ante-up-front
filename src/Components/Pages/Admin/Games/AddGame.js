import React, {useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {PrimaryButton, TextField} from "@fluentui/react";
import "./../Admin.css"
function AddGame(props){
    const [smallImage, setSmallImage] = useState({});
    const [bigImage, setBigImage] = useState({});


    const onFileChangeSmall = event => {
        setSmallImage(event.target.files[0]);
    }
    const onFileChangeBig = event => {
        setBigImage(event.target.files[0])
    }

    return <div>
        <div className={"adminCreatePanel"}>
            <div style={{margin: "10px", marginLeft: "25px", fontSize: "x-large"}}>Add a new game</div>
            <div className={"adminCreateContent"}>
                <div style={{width: "90%"}}>
                    <TextField placeholder={"Name of the game..."}/>
                </div>
                <div style={{fontSize:'medium'}}>
                    <div>Image for the card (has to be 285x380 or alike)</div>
                    <input onChange={onFileChangeSmall} type="file" name="file"/>
                </div>
                <div style={{fontSize:'medium'}}>
                    <div>Image for the banner (has to be 1920x1080 or alike)</div>
                    <input onChange={onFileChangeBig} type="file" name="file"/>
                </div>
                <div>
                    <PrimaryButton text={"Create"} iconProps={{iconName: 'Add'}}/>
                </div>
            </div>
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};

export default connect(mapStateToProps)(AddGame);