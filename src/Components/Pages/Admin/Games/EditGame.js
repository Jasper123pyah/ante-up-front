import React, {useEffect, useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {DefaultButton, Dropdown, Position, PrimaryButton, SpinButton, TextField} from "@fluentui/react";
import "./../Admin.css"
import {GetImage, UploadImage} from "../../../../Core/FirebaseImages/FirebaseImage";
import DeleteModal from "./DeleteModal";

function EditGame(props) {
    const [smallImage, setSmallImage] = useState(null);
    const [bigImage, setBigImage] = useState(null);
    const [gameName, setGameName] = useState(props.game.name);
    const [waitingTime, setWaitingTime] = useState(props.game.waitingTime);
    const [selectedLobbySizes, setSelectedLobbySizes] = useState(props.game.lobbySizes);
    const [showDeleteModal, setShowDeleteModal] = useState();

    const [nameError, setNameError] = useState('');
    const [waitingTimeError, setWaitingTimeError] = useState('');
    const [lobbySizeError, setLobbySizeError] = useState('');
    const [showSuccess, setShowSuccess] = useState('');

    useEffect(() => {
        setGameName(props.game.name);
        setWaitingTime(props.game.waitingTime);
        setSelectedLobbySizes(props.game.lobbySizes);
        setShowSuccess('')
    },[props.game.name])

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
                props.api.put("admin/game", {
                    id: props.game.id,
                    name: gameName,
                    image: smallImage ? smallImage.name : null,
                    bannerImage: bigImage ? bigImage.name: null,
                    waitingTime: waitingTime,
                    lobbySizes: selectedLobbySizes
                }).then(res => {
                    if(smallImage !== null){
                        UploadImage("CardImages", smallImage);
                    }
                    if(bigImage !== null){
                        UploadImage("BannerImages", bigImage);
                    }
                    setShowSuccess('Game edited.');
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
    function ChangeDeleteModal() {
        showDeleteModal ? setShowDeleteModal(false) : setShowDeleteModal(true);
    }
    function CheckForErrors() {
        let errorCount = 0;
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
        if (errorCount === 0)
            return false;
        else
            return true;
    }

    const onFileChangeSmall = event => {
        setSmallImage(event.target.files[0]);
    }
    const onFileChangeBig = event => {
        setBigImage(event.target.files[0])
    }

    return <div>
        <DeleteModal show={showDeleteModal} setShowModal={ChangeDeleteModal} game={props.game}/>
        <div className={"adminCreatePanel"}>
            <div className={"adminCreateContent"}>
                <div style={{marginRight: "5%"}}>
                    <div style={{ fontSize: "x-large"}}>Edit {props.game.name}</div>
                    <TextField label={"Name"} errorMessage={nameError} onChange={ChangeGameName}
                               value={gameName}
                               placeholder={"Name of the game..."}/>
                    <Dropdown placeholder={"Select Lobby Sizes"}
                              label={"Lobby Sizes"}
                              options={lobbySizes}
                              onChange={ChangeLobbySizes}
                              multiSelect
                              defaultSelectedKeys={selectedLobbySizes}
                              errorMessage={lobbySizeError}
                    />
                    <SpinButton labelPosition={Position.top}
                                defaultValue={waitingTime}
                                label={"Max game length in minutes"}
                                onChange={ChangeWaitingTime} placeholder={"Name of the game..."}
                    />
                    <div style={{color: '#a4262c', fontSize: '12px'}}>{waitingTimeError}</div>
                </div>
                <div style={{fontSize: 'medium'}}>
                    <div>Image for the card (has to be 285x380 or alike)</div>
                    <input onChange={onFileChangeSmall} type="file" name="file"/>
                </div>
                <div style={{fontSize: 'medium'}}>
                    <div>Image for the banner (has to be 1920x1080 or alike)</div>
                    <input onChange={onFileChangeBig} type="file" name="file"/>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', marginRight:'5%'}}>
                    <div>
                        <PrimaryButton onClick={Submit} text={"Edit"} iconProps={{iconName: 'Edit'}}/>
                        <div style={{color:'#39ff13'}}>{showSuccess}</div>
                    </div>
                    <div>
                        <DefaultButton onClick={ChangeDeleteModal} text={"Delete"} iconProps={{iconName: 'Cancel'}}/>
                    </div>
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

export default connect(mapStateToProps)(EditGame);