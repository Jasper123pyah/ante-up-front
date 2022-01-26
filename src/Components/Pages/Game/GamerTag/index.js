import React, {useState} from "react";
import "./GamerTag.css";
import {DefaultButton, PrimaryButton, TextField} from "@fluentui/react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

function GamerTag(props) {
    const [gamerTag, setGamerTag] = useState("");
    const history = useHistory();
    function handleText(e, value){
        setGamerTag(value)
    }
    function submitGamerTag(){
        if(props.api !== undefined){
            props.api.post('/tag', {
                game: props.gameName,
                tag: gamerTag
            }).then(() => window.location.reload());
        }
    }

    return <div>
        <div className={"centerBox"}>
            <div className={"formBox"}>
                <div className={"errorMessage"}>
                    It seems like you haven't added a gamertag for {props.gameName} yet! Please add your gamertag.
                </div>
                <div className={'submitBox'}>
                    <div style={{width:'100%'}}>
                        <TextField onChange={handleText}/>
                    </div>
                    <br/>
                    <div style={{marginTop:"20px", display:'flex', gap:'20px'}}>
                        <DefaultButton onClick={() => history.goBack()} text={"Go Back"}/>
                        <PrimaryButton onClick={submitGamerTag} text={"Submit"}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};
export default connect(mapStateToProps)(GamerTag);