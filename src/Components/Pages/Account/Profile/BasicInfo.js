import React from "react";

function BasicInfo(){

    return <div style={{display:'flex', marginBottom:'2vh'}}>
        <div className={'profilePicture'}/>
        <div style={{display: 'flex', flexDirection:'column', marginLeft:'20px'}}>
            <div style={{fontSize:'x-large', marginBottom:'10px', fontWeight:'bold'}}>
                Testname
            </div>
            <div style={{fontSize:'medium'}}>
                Joined 12/1/2021
            </div>
            <div style={{fontSize:'medium'}}>
                Gamer ID: #4343
            </div>
        </div>
    </div>
}

export default BasicInfo;