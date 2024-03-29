import React, {useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {Dropdown, Position, PrimaryButton, SpinButton, TextField} from "@fluentui/react";
import "./../Admin.css"
import {UploadImage} from "../../../../Core/FirebaseImages/FirebaseImage";

function AddGame(props) {
    const [smallImage, setSmallImage] = useState(null);
    const [bigImage, setBigImage] = useState(null);
    const [gameName, setGameName] = useState('');
    const [waitingTime, setWaitingTime] = useState(0);
    const [selectedLobbySizes, setSelectedLobbySizes] = useState([]);

    const [smallImageError, setSmallImageError] = useState('');
    const [bigImageError, setBigImageError] = useState('');
    const [nameError, setNameError] = useState('');
    const [waitingTimeError, setWaitingTimeError] = useState('');
    const [lobbySizeError, setLobbySizeError] = useState('');
    const [showSuccess, setShowSuccess] = useState('');

    const lobbySizes = [
        {key: '1v1', text: "1v1"},
        {key: '2v2', text: "2v2"},
        {key: '3v3', text: "3v3"},
        {key: '4v4', text: "4v4"},
        {key: '5v5', text: "5v5"},
        {key: '6v6', text: "6v6"}
    ];

    function Submit() {
        if (!CheckForErrors()) {
            if (props.api !== undefined) {
                props.api.post("admin/game", {
                    name: gameName,
                    image: smallImage.name,
                    bannerImage: bigImage.name,
                    waitingTime: waitingTime,
                    lobbySizes: selectedLobbySizes
                }).then(res => {
                    UploadImage("BannerImages", bigImage);
                    UploadImage("CardImages", smallImage);
                    setShowSuccess('Game added. Refresh to see it in the list.');
                }).catch((err) => console.log(err));
            }
        }
    }

    function ChangeLobbySizes(e, option) {
        var options = selectedLobbySizes;
        if (option.selected) {
            options.push(option.text);
        } else {
            const index = options.indexOf(option.text);
            options.splice(index, 1);
        }
        setSelectedLobbySizes(options);
        setLobbySizeError('');
    }

    function ChangeGameName(e, text) {
        setGameName(text);
        setNameError('');
    }

    function ChangeWaitingTime(e, text) {
        setWaitingTime(text);
        setWaitingTimeError('');
    }

    function CheckForErrors() {
        let errorCount = 0;
        if (smallImage === null) {
            setSmallImageError("Upload an image for the card.")
            errorCount++;
        }
        if (bigImage === null) {
            setBigImageError("Upload an image for the banner.")
            errorCount++;
        }
        if (gameName === '') {
            setNameError("Fill in a name for the game.")
            errorCount++;
        }
        if (selectedLobbySizes.length === 0) {
            setLobbySizeError("Choose a lobby size.")
            errorCount++;
        }
        if (waitingTime < 15) {
            setWaitingTimeError("Max game length has to be more than 15 minutes.")
            errorCount++;
        }
        return errorCount !== 0;
    }

    const onFileChangeSmall = event => {
        setSmallImage(event.target.files[0]);
        setSmallImageError("")
    }
    const onFileChangeBig = event => {
        setBigImage(event.target.files[0])
        setBigImageError("")
    }

    return <div>
        <div className={"adminCreatePanel"}>
            <div className={"adminCreateContent"}>
                <div style={{width: "95%"}}>
                    <div style={{fontSize: "x-large"}}>Add a new game</div>
                    <TextField label={"Name"} errorMessage={nameError} onChange={ChangeGameName}
                               placeholder={"Name of the game..."}/>
                    <Dropdown placeholder={"Select Lobby Sizes"}
                              label={"Lobby Sizes"}
                              options={lobbySizes}
                              onChange={ChangeLobbySizes}
                              multiSelect
                              errorMessage={lobbySizeError}
                    />
                    <SpinButton labelPosition={Position.top}
                                label={"Max game length in minutes"}
                                onChange={ChangeWaitingTime} placeholder={"Name of the game..."}
                    />
                    <div style={{color: '#a4262c', fontSize: '12px'}}>{waitingTimeError}</div>
                </div>
                <div style={{fontSize: 'medium'}}>
                    <div>Image for the card (has to be 285x380 or alike)</div>
                    <input onChange={onFileChangeSmall} type="file" name="file"/>
                    <div style={{color: '#a4262c', fontSize: '12px'}}>{smallImageError}</div>
                </div>
                <div style={{fontSize: 'medium'}}>
                    <div>Image for the banner (has to be 1920x1080 or alike)</div>
                    <input onChange={onFileChangeBig} type="file" name="file"/>
                    <div style={{color: '#a4262c', fontSize: '12px'}}>{bigImageError}</div>
                </div>
                <div>
                    <PrimaryButton onClick={Submit} text={"Create"} iconProps={{iconName: 'Add'}}/>
                    <div style={{color:'#39ff13'}}>{showSuccess}</div>
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