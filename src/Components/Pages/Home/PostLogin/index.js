import React from "react";
import Recommended from "./Recommended";
import WagerList from "./WagerList";
import TournamentList from "./TournamentList";

function PostLoginHome(){
    return <div>
        <Recommended/>
        <WagerList/>
        <TournamentList/>
    </div>
}
export default PostLoginHome;