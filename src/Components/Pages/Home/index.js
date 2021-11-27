import React from 'react';
import {connect} from "react-redux";
import PostLoginHome from "./PostLogin";
import {useCookies} from "react-cookie";
import PreLoginHome from "./PreLogin";

function Home(){
    const [cookies] = useCookies(['ANTE_UP_SESSION_TOKEN']);

    return <div>
        {cookies.ANTE_UP_SESSION_TOKEN !== undefined ? <PostLoginHome/> : <PreLoginHome/>}
    </div>

}

const mapStateToProps = (state) => {
    return {
    };
};
export default  connect(mapStateToProps) (Home);

