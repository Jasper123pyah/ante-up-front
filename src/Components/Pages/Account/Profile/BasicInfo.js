import React from "react";

function BasicInfo(props){

    return <div style={{display:'flex', marginBottom:'2vh'}}>
        <div className={'profilePicture'}/>
        <div style={{display: 'flex', flexDirection:'column', marginLeft:'20px'}}>
            <div style={{fontSize:'xx-large', marginBottom:'10px', fontWeight:'bold'}}>
                {props.info.accountName}
            </div>
            <div style={{fontSize:'large'}}>
                Joined: {new Date(props.info.joined).toLocaleDateString()}
            </div>
        </div>
    </div>
}

export default BasicInfo;